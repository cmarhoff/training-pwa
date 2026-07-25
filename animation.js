// animation.js – einfache SVG-Strichmännchen für die Übungen

(() => {
  const animationBox = document.getElementById('animation');
  const head = document.getElementById('figureHead');
  const torso = document.getElementById('figureTorso');
  const leftArm = document.getElementById('figureLeftArm');
  const rightArm = document.getElementById('figureRightArm');
  const leftLeg = document.getElementById('figureLeftLeg');
  const rightLeg = document.getElementById('figureRightLeg');

  let animationFrame = null;
  let currentFrames = null;
  let frameIndex = 0;
  let segmentStart = 0;

  const point = (x, y) => ({ x, y });

  const pose = ({
    head: h,
    neck,
    hip,
    leftElbow,
    leftHand,
    rightElbow,
    rightHand,
    leftKnee,
    leftFoot,
    rightKnee,
    rightFoot
  }) => ({
    head: h,
    neck,
    hip,
    leftElbow,
    leftHand,
    rightElbow,
    rightHand,
    leftKnee,
    leftFoot,
    rightKnee,
    rightFoot
  });

  const standing = pose({
    head: point(160, 38), neck: point(160, 64), hip: point(160, 125),
    leftElbow: point(145, 92), leftHand: point(148, 132),
    rightElbow: point(175, 92), rightHand: point(172, 132),
    leftKnee: point(150, 160), leftFoot: point(142, 195),
    rightKnee: point(170, 160), rightFoot: point(178, 195)
  });

  const crouch = pose({
    head: point(160, 70), neck: point(160, 94), hip: point(160, 140),
    leftElbow: point(135, 115), leftHand: point(120, 145),
    rightElbow: point(185, 115), rightHand: point(200, 145),
    leftKnee: point(135, 165), leftFoot: point(125, 195),
    rightKnee: point(185, 165), rightFoot: point(195, 195)
  });

  const jump = pose({
    head: point(160, 18), neck: point(160, 44), hip: point(160, 100),
    leftElbow: point(130, 50), leftHand: point(112, 26),
    rightElbow: point(190, 50), rightHand: point(208, 26),
    leftKnee: point(140, 132), leftFoot: point(122, 150),
    rightKnee: point(180, 132), rightFoot: point(198, 150)
  });

  const burpeeStandSide = pose({
    // Reine Seitenansicht, Blickrichtung nach links.
    head: point(138, 38), neck: point(150, 64), hip: point(168, 126),
    leftElbow: point(145, 94), leftHand: point(150, 132),
    rightElbow: point(153, 94), rightHand: point(158, 132),
    leftKnee: point(157, 160), leftFoot: point(150, 195),
    rightKnee: point(176, 160), rightFoot: point(181, 195)
  });

  const burpeeSquatSide = pose({
    // Tiefe Hocke. Arme gestreckt; beide Hände liegen bereits am Boden.
    head: point(105, 92), neck: point(126, 108), hip: point(171, 151),
    leftElbow: point(106, 150), leftHand: point(88, 195),
    rightElbow: point(116, 151), rightHand: point(98, 195),
    leftKnee: point(143, 174), leftFoot: point(151, 195),
    rightKnee: point(178, 176), rightFoot: point(184, 195)
  });

  const burpeePlankSide = pose({
    // Füße hinten, Arme gestreckt. Die Hände bleiben an derselben Stelle.
    head: point(64, 112), neck: point(91, 123), hip: point(190, 136),
    leftElbow: point(91, 159), leftHand: point(88, 195),
    rightElbow: point(101, 159), rightHand: point(98, 195),
    leftKnee: point(233, 157), leftFoot: point(282, 195),
    rightKnee: point(239, 154), rightFoot: point(289, 195)
  });

  const burpeePushUpLowSide = pose({
    // Liegestütz unten. Hände bleiben unverändert am Boden.
    head: point(61, 151), neck: point(88, 157), hip: point(190, 160),
    leftElbow: point(112, 174), leftHand: point(88, 195),
    rightElbow: point(122, 174), rightHand: point(98, 195),
    leftKnee: point(234, 171), leftFoot: point(282, 195),
    rightKnee: point(240, 168), rightFoot: point(289, 195)
  });

  const burpeeJumpSide = pose({
    // Gestreckter Sprung in Seitenansicht, Arme ebenfalls gestreckt nach oben.
    head: point(140, 14), neck: point(151, 40), hip: point(168, 101),
    leftElbow: point(137, 24), leftHand: point(127, 1),
    rightElbow: point(145, 25), rightHand: point(136, 2),
    leftKnee: point(158, 135), leftFoot: point(153, 168),
    rightKnee: point(176, 135), rightFoot: point(180, 168)
  });

  const jackOpen = pose({
    // Arme und Beine sind geöffnet, während die Figur sichtbar in der Luft ist.
    head: point(160, 22), neck: point(160, 48), hip: point(160, 108),
    leftElbow: point(124, 56), leftHand: point(90, 26),
    rightElbow: point(196, 56), rightHand: point(230, 26),
    leftKnee: point(138, 140), leftFoot: point(108, 180),
    rightKnee: point(182, 140), rightFoot: point(212, 180)
  });

  const highKneeLeft = pose({
    head: point(160, 38), neck: point(160, 64), hip: point(160, 125),
    leftElbow: point(180, 88), leftHand: point(193, 116),
    rightElbow: point(140, 88), rightHand: point(125, 112),
    leftKnee: point(128, 130), leftFoot: point(145, 150),
    rightKnee: point(172, 160), rightFoot: point(178, 195)
  });

  const highKneeRight = pose({
    head: point(160, 38), neck: point(160, 64), hip: point(160, 125),
    leftElbow: point(140, 88), leftHand: point(125, 112),
    rightElbow: point(180, 88), rightHand: point(193, 116),
    leftKnee: point(148, 160), leftFoot: point(142, 195),
    rightKnee: point(192, 130), rightFoot: point(175, 150)
  });

  const plankHigh = pose({
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(88, 150), leftHand: point(92, 195),
    rightElbow: point(103, 150), rightHand: point(108, 195),
    leftKnee: point(220, 150), leftFoot: point(275, 195),
    rightKnee: point(225, 147), rightFoot: point(282, 195)
  });

  const plankLow = pose({
    head: point(50, 145), neck: point(78, 154), hip: point(178, 158),
    leftElbow: point(108, 170), leftHand: point(92, 195),
    rightElbow: point(122, 170), rightHand: point(108, 195),
    leftKnee: point(225, 167), leftFoot: point(275, 195),
    rightKnee: point(230, 164), rightFoot: point(282, 195)
  });

  const forearmPlank = pose({
    head: point(52, 114), neck: point(78, 123), hip: point(178, 131),
    leftElbow: point(108, 154), leftHand: point(88, 195),
    rightElbow: point(124, 154), rightHand: point(104, 195),
    leftKnee: point(226, 150), leftFoot: point(278, 195),
    rightKnee: point(232, 148), rightFoot: point(286, 195)
  });

  const forearmPlankDip = pose({
    head: point(52, 118), neck: point(78, 127), hip: point(178, 136),
    leftElbow: point(108, 156), leftHand: point(88, 195),
    rightElbow: point(124, 156), rightHand: point(104, 195),
    leftKnee: point(226, 154), leftFoot: point(278, 195),
    rightKnee: point(232, 152), rightFoot: point(286, 195)
  });

  const mountainLeft = pose({
    // Linkes Knie bis unter die Brust; das rechte Bein bleibt gestreckt.
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(88, 150), leftHand: point(92, 195),
    rightElbow: point(103, 150), rightHand: point(108, 195),
    leftKnee: point(122, 128), leftFoot: point(151, 166),
    rightKnee: point(225, 148), rightFoot: point(282, 195)
  });

  const mountainRight = pose({
    // Rechtes Knie bis unter die Brust; das linke Bein bleibt gestreckt.
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(88, 150), leftHand: point(92, 195),
    rightElbow: point(103, 150), rightHand: point(108, 195),
    leftKnee: point(220, 150), leftFoot: point(275, 195),
    rightKnee: point(128, 137), rightFoot: point(157, 172)
  });

  const lying = pose({
    head: point(48, 164), neck: point(75, 172), hip: point(158, 176),
    leftElbow: point(105, 178), leftHand: point(135, 181),
    rightElbow: point(105, 170), rightHand: point(135, 173),
    leftKnee: point(215, 150), leftFoot: point(252, 195),
    rightKnee: point(220, 154), rightFoot: point(260, 195)
  });

  const flutterA = pose({
    head: point(48, 154), neck: point(75, 166), hip: point(158, 176),
    leftElbow: point(108, 178), leftHand: point(138, 181),
    rightElbow: point(108, 170), rightHand: point(138, 173),
    leftKnee: point(210, 158), leftFoot: point(270, 126),
    rightKnee: point(215, 180), rightFoot: point(275, 192)
  });

  const flutterB = pose({
    head: point(48, 154), neck: point(75, 166), hip: point(158, 176),
    leftElbow: point(108, 178), leftHand: point(138, 181),
    rightElbow: point(108, 170), rightHand: point(138, 173),
    leftKnee: point(215, 180), leftFoot: point(275, 192),
    rightKnee: point(210, 158), rightFoot: point(270, 126)
  });

  const bridgeLow = pose({
    head: point(48, 170), neck: point(75, 176), hip: point(158, 178),
    leftElbow: point(105, 180), leftHand: point(135, 184),
    rightElbow: point(105, 172), rightHand: point(135, 176),
    leftKnee: point(215, 142), leftFoot: point(250, 195),
    rightKnee: point(225, 144), rightFoot: point(265, 195)
  });

  const bridgeHigh = pose({
    head: point(48, 170), neck: point(75, 176), hip: point(160, 118),
    leftElbow: point(105, 180), leftHand: point(135, 184),
    rightElbow: point(105, 172), rightHand: point(135, 176),
    leftKnee: point(215, 142), leftFoot: point(250, 195),
    rightKnee: point(225, 144), rightFoot: point(265, 195)
  });

  const goodMorningHigh = pose({
    // Breiter Stand, Hände hinter dem Kopf.
    head: point(160, 38), neck: point(160, 64), hip: point(160, 125),
    leftElbow: point(122, 70), leftHand: point(148, 52),
    rightElbow: point(198, 70), rightHand: point(172, 52),
    leftKnee: point(138, 160), leftFoot: point(112, 195),
    rightKnee: point(182, 160), rightFoot: point(208, 195)
  });

  const goodMorningBent = pose({
    // Hüfte bleibt hinten, Oberkörper klappt nach vorn; Hände bleiben am Kopf.
    head: point(232, 92), neck: point(208, 104), hip: point(160, 130),
    leftElbow: point(202, 74), leftHand: point(220, 86),
    rightElbow: point(252, 76), rightHand: point(244, 90),
    leftKnee: point(138, 162), leftFoot: point(112, 195),
    rightKnee: point(182, 162), rightFoot: point(208, 195)
  });

  const pikeHigh = pose({
    head: point(70, 130), neck: point(92, 125), hip: point(165, 62),
    leftElbow: point(88, 158), leftHand: point(82, 195),
    rightElbow: point(103, 158), rightHand: point(98, 195),
    leftKnee: point(215, 125), leftFoot: point(265, 195),
    rightKnee: point(225, 125), rightFoot: point(278, 195)
  });

  const pikeLow = pose({
    head: point(82, 176), neck: point(100, 160), hip: point(165, 72),
    leftElbow: point(105, 178), leftHand: point(82, 195),
    rightElbow: point(120, 178), rightHand: point(98, 195),
    leftKnee: point(215, 128), leftFoot: point(265, 195),
    rightKnee: point(225, 128), rightFoot: point(278, 195)
  });

  const sitUpLow = pose({
    // Gesäß bleibt am Boden, Knie gebeugt.
    head: point(48, 167), neck: point(76, 174), hip: point(160, 184),
    leftElbow: point(102, 152), leftHand: point(122, 138),
    rightElbow: point(108, 158), rightHand: point(132, 146),
    leftKnee: point(214, 146), leftFoot: point(248, 195),
    rightKnee: point(224, 149), rightFoot: point(264, 195)
  });

  const sitUpHigh = pose({
    // Auch oben bleibt das Gesäß unten; nur der Oberkörper richtet sich auf.
    head: point(126, 86), neck: point(138, 110), hip: point(160, 184),
    leftElbow: point(164, 126), leftHand: point(190, 136),
    rightElbow: point(160, 136), rightHand: point(188, 148),
    leftKnee: point(214, 146), leftFoot: point(248, 195),
    rightKnee: point(224, 149), rightFoot: point(264, 195)
  });

  const sidePlankLeftHigh = pose({
    // Stützender Unterarm liegt vollständig am Boden, freier Arm parallel zum Körper.
    head: point(58, 108), neck: point(84, 122), hip: point(176, 150),
    leftElbow: point(96, 170), leftHand: point(74, 195),
    rightElbow: point(132, 134), rightHand: point(170, 146),
    leftKnee: point(226, 168), leftFoot: point(276, 195),
    rightKnee: point(232, 164), rightFoot: point(286, 195)
  });

  const sidePlankLeftLow = pose({
    head: point(58, 116), neck: point(84, 130), hip: point(176, 164),
    leftElbow: point(96, 174), leftHand: point(74, 195),
    rightElbow: point(132, 146), rightHand: point(170, 158),
    leftKnee: point(226, 176), leftFoot: point(276, 195),
    rightKnee: point(232, 172), rightFoot: point(286, 195)
  });

  const mirror = original => {
    const mirrored = {};
    for (const [name, value] of Object.entries(original)) {
      mirrored[name] = point(320 - value.x, value.y);
    }
    return mirrored;
  };

  const sidePlankRightHigh = mirror(sidePlankLeftHigh);
  const sidePlankRightLow = mirror(sidePlankLeftLow);

  const tRotationLeft = pose({
    // Aus der hohen Planke: rechter Arm trägt, linker Arm zeigt nach oben.
    // Kopf, Schulterlinie und Hüfte heben sich etwas mit der Körperrotation.
    head: point(62, 94), neck: point(88, 108), hip: point(180, 142),
    leftElbow: point(91, 72), leftHand: point(88, 30),
    rightElbow: point(108, 154), rightHand: point(112, 195),
    leftKnee: point(228, 164), leftFoot: point(278, 195),
    rightKnee: point(234, 158), rightFoot: point(288, 195)
  });

  const tRotationRight = pose({
    // Zurück in die Planke und anschließend die andere Seite öffnen.
    head: point(62, 98), neck: point(88, 112), hip: point(180, 144),
    leftElbow: point(103, 154), leftHand: point(106, 195),
    rightElbow: point(126, 76), rightHand: point(132, 32),
    leftKnee: point(228, 164), leftFoot: point(278, 195),
    rightKnee: point(234, 158), rightFoot: point(288, 195)
  });

  const diamondHigh = pose({
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(98, 153), leftHand: point(112, 195),
    rightElbow: point(116, 153), rightHand: point(116, 195),
    leftKnee: point(220, 150), leftFoot: point(275, 195),
    rightKnee: point(225, 147), rightFoot: point(282, 195)
  });

  const diamondLow = pose({
    head: point(50, 145), neck: point(78, 154), hip: point(178, 158),
    leftElbow: point(105, 174), leftHand: point(112, 195),
    rightElbow: point(122, 174), rightHand: point(116, 195),
    leftKnee: point(225, 167), leftFoot: point(275, 195),
    rightKnee: point(230, 164), rightFoot: point(282, 195)
  });

  const frames = (duration, ...poses) => poses.map(currentPose => ({
    pose: currentPose,
    duration
  }));

  const animations = {
    "flutter-kicks": frames(260, flutterA, flutterB),
    "push-ups": frames(700, plankHigh, plankLow),
    "vertical-jumps": frames(450, standing, crouch, jump, standing),
    "plank": frames(900, forearmPlank, forearmPlankDip),
    "mountain-climber": frames(330, mountainLeft, mountainRight),
    "glute-bridge": frames(700, bridgeLow, bridgeHigh),
    "high-knees": frames(300, highKneeLeft, highKneeRight),
    "t-rotation-plank": frames(700, plankHigh, tRotationLeft, plankHigh, tRotationRight),
    "jumping-jacks": frames(430, standing, jackOpen),
    "side-plank-left": frames(900, sidePlankLeftHigh, sidePlankLeftLow),
    "burpees": [
      { pose: burpeeStandSide, duration: 700 },
      { pose: burpeeSquatSide, duration: 800 },
      { pose: burpeePlankSide, duration: 750 },
      { pose: burpeePushUpLowSide, duration: 650 },
      { pose: burpeePlankSide, duration: 650 },
      { pose: burpeeSquatSide, duration: 800 },
      { pose: burpeeJumpSide, duration: 650 },
      { pose: burpeeStandSide, duration: 700 }
    ],
    "side-plank-right": frames(900, sidePlankRightHigh, sidePlankRightLow),
    "good-mornings": frames(750, goodMorningHigh, goodMorningBent),
    "pike-push-up": frames(700, pikeHigh, pikeLow),
    "diamond-push-up": frames(700, diamondHigh, diamondLow),
    "sit-ups": frames(800, sitUpLow, sitUpHigh)
  };

  const interpolatePoint = (from, to, amount) => point(
    from.x + (to.x - from.x) * amount,
    from.y + (to.y - from.y) * amount
  );

  const interpolatePose = (from, to, amount) => {
    const result = {};
    for (const name of Object.keys(from)) {
      result[name] = interpolatePoint(from[name], to[name], amount);
    }
    return result;
  };

  const smooth = value => value * value * (3 - 2 * value);
  const asPointList = (...points) => points.map(p => `${p.x},${p.y}`).join(' ');

  function draw(currentPose) {
    head.setAttribute('cx', currentPose.head.x);
    head.setAttribute('cy', currentPose.head.y);

    torso.setAttribute('x1', currentPose.neck.x);
    torso.setAttribute('y1', currentPose.neck.y);
    torso.setAttribute('x2', currentPose.hip.x);
    torso.setAttribute('y2', currentPose.hip.y);

    leftArm.setAttribute('points', asPointList(
      currentPose.neck,
      currentPose.leftElbow,
      currentPose.leftHand
    ));
    rightArm.setAttribute('points', asPointList(
      currentPose.neck,
      currentPose.rightElbow,
      currentPose.rightHand
    ));
    leftLeg.setAttribute('points', asPointList(
      currentPose.hip,
      currentPose.leftKnee,
      currentPose.leftFoot
    ));
    rightLeg.setAttribute('points', asPointList(
      currentPose.hip,
      currentPose.rightKnee,
      currentPose.rightFoot
    ));
  }

  function tick(now) {
    if (!currentFrames) {
      return;
    }

    let elapsed = now - segmentStart;
    let duration = currentFrames[frameIndex].duration;

    while (elapsed >= duration) {
      elapsed -= duration;
      frameIndex = (frameIndex + 1) % currentFrames.length;
      segmentStart = now - elapsed;
      duration = currentFrames[frameIndex].duration;
    }

    const nextIndex = (frameIndex + 1) % currentFrames.length;
    const amount = smooth(elapsed / duration);
    draw(interpolatePose(
      currentFrames[frameIndex].pose,
      currentFrames[nextIndex].pose,
      amount
    ));

    animationFrame = requestAnimationFrame(tick);
  }

  window.startExerciseAnimation = name => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }

    currentFrames = animations[name] || animations.plank;
    frameIndex = 0;
    segmentStart = performance.now();
    animationBox.style.display = 'block';
    draw(currentFrames[0].pose);
    animationFrame = requestAnimationFrame(tick);
  };

  window.stopExerciseAnimation = () => {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    currentFrames = null;
    animationBox.style.display = 'none';
  };
})();
