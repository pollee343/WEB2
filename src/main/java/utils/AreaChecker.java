package utils;

public class AreaChecker {
    public static boolean isInArea(double x, double y, double r) {
        if (x >= 0 && y >= 0) {
            return (x <= r / 2) && (y <= -2 * x + r);
        }
        if (x <= 0 && y >= 0) {
            return (x * x + y * y) <= r * r / 4;
        }
        if (x >= 0 && y <= 0) {
            return (x <= r / 2) && (y >= -r);
        }
        return false;
    }


}
