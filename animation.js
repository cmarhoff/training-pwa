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

  const jackOpen = pose({
    head: point(160, 34), neck: point(160, 60), hip: point(160, 120),
    leftElbow: point(125, 68), leftHand: point(92, 42),
    rightElbow: point(195, 68), rightHand: point(228, 42),
    leftKnee: point(136, 154), leftFoot: point(110, 195),
    rightKnee: point(184, 154), rightFoot: point(210, 195)
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

  const mountainLeft = pose({
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(88, 150), leftHand: point(92, 195),
    rightElbow: point(103, 150), rightHand: point(108, 195),
    leftKnee: point(145, 165), leftFoot: point(118, 195),
    rightKnee: point(225, 148), rightFoot: point(282, 195)
  });

  const mountainRight = pose({
    head: point(50, 105), neck: point(76, 115), hip: point(175, 127),
    leftElbow: point(88, 150), leftHand: point(92, 195),
    rightElbow: point(103, 150), rightHand: point(108, 195),
    leftKnee: point(220, 150), leftFoot: point(275, 195),
    rightKnee: point(150, 165), rightFoot: point(123, 195)
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

  const goodMorningBent = pose({
    head: point(225, 90), neck: point(202, 102), hip: point(160, 132),
    leftElbow: point(190, 128), leftHand: point(205, 156),
    rightElbow: point(202, 120), rightHand: point(220, 146),
    leftKnee: point(150, 162), leftFoot: point(142, 195),
    rightKnee: point(170, 162), rightFoot: point(178, 195)
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
    head: point(48, 164), neck: point(75, 172), hip: point(160, 176),
    leftElbow: point(105, 145), leftHand: point(126, 128),
    rightElbow: point(108, 151), rightHand: point(132, 138),
    leftKnee: point(215, 140), leftFoot: point(250, 195),
    rightKnee: point(225, 143), rightFoot: point(265, 195)
  });

  const sitUpHigh = pose({
    head: point(126, 70), neck: point(140, 94), hip: point(160, 176),
    leftElbow: point(168, 112), leftHand: point(198, 126),
    rightElbow: point(165, 122), rightHand: point(195, 138),
    leftKnee: point(215, 140), leftFoot: point(250, 195),
    rightKnee: point(225, 143), rightFoot: point(265, 195)
  });

  const sidePlankLeftHigh = pose({
    head: point(58, 102), neck: point(82, 116), hip: point(174, 146),
    leftElbow: point(98, 156), leftHand: point(103, 195),
    rightElbow: point(80, 75), rightHand: point(76, 35),
    leftKnee: point(225, 166), leftFoot: point(275, 195),
    rightKnee: point(230, 160), rightFoot: point(284, 195)
  });

  const sidePlankLeftLow = pose({
    head: point(58, 112), neck: point(82, 126), hip: point(174, 164),
    leftElbow: point(98, 166), leftHand: point(103, 195),
    rightElbow: point(80, 82), rightHand: point(76, 42),
    leftKnee: point(225, 174), leftFoot: point(275, 195),
    rightKnee: point(230, 170), rightFoot: point(284, 195)
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

  const tRotation = pose({
    head: point(70, 102), neck: point(94, 116), hip: point(180, 144),
    leftElbow: point(105, 154), leftHand: point(108, 195),
    rightElbow: point(115, 75), rightHand: point(112, 34),
    leftKnee: point(228, 165), leftFoot: point(278, 195),
    rightKnee: point(234, 160), rightFoot: point(288, 195)
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
    "plank": frames(900, plankHigh, {
      ...plankHigh,
      head: point(50, 108), neck: point(76, 118), hip: point(175, 130)
    }),
    "mountain-climber": frames(330, mountainLeft, mountainRight),
    "glute-bridge": frames(700, bridgeLow, bridgeHigh),
    "high-knees": frames(300, highKneeLeft, highKneeRight),
    "t-rotation-plank": frames(800, plankHigh, tRotation, plankHigh, mirror(tRotation)),
    "jumping-jacks": frames(430, standing, jackOpen),
    "side-plank-left": frames(900, sidePlankLeftHigh, sidePlankLeftLow),
    "burpees": frames(360, standing, crouch, plankHigh, crouch, jump, standing),
    "side-plank-right": frames(900, sidePlankRightHigh, sidePlankRightLow),
    "good-mornings": frames(750, standing, goodMorningBent),
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
