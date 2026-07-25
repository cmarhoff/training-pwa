#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

int main(int argc, char *argv[])
{
    if (argc != 6) {
        fprintf(stderr,
            "Usage: %s center_x center_y point_x point_y degrees\n"
            "degrees >0 = clockwise, <0 = counter-clockwise\n",
            argv[0]);
        return 1;
    }

    int cx   = atoi(argv[1]);
    int cy   = atoi(argv[2]);
    int px   = atoi(argv[3]);
    int py   = atoi(argv[4]);
    int deg  = atoi(argv[5]);

    /* Für y nach unten gilt:
       clockwise => positiver mathematischer Winkel */
    double a = deg * M_PI / 180.0;

    double dx = px - cx;
    double dy = py - cy;

    double xr = dx * cos(a) - dy * sin(a);
    double yr = dx * sin(a) + dy * cos(a);

    printf("%.6f %.6f\n", cx + xr, cy + yr);

    return 0;
}
