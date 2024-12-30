package utils;

import java.util.Arrays;
import java.util.List;

public class CoordinatesValidator {

    public static void checkData(String x, String y, String r) throws IllegalArgumentException{
        if (x == null || x.isEmpty()) {
            throw new IllegalArgumentException("The 'x' parameter is missing or empty.");
        }
        if (y == null || y.isEmpty()) {
            throw new IllegalArgumentException("The 'y' parameter is missing or empty.");
        }
        if (r == null || r.isEmpty()) {
            throw new IllegalArgumentException("The 'r' parameter is missing or empty.");
        }

        if (!checkX(Double.parseDouble(x))) {
            throw new IllegalArgumentException("Invalid or out-of-bounds 'x' parameter.");
        }
        if (!checkY(Double.parseDouble(y))) {
            throw new IllegalArgumentException("Invalid or out-of-bounds 'y' parameter.");
        }
        if (!checkR(Double.parseDouble(r))) {
            throw new IllegalArgumentException("Invalid or out-of-bounds 'r' parameter.");
        }

    }

    private static boolean checkX(double x) {
        List<Double> validXValues = Arrays.asList(-5.0, -4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0);
        return validXValues.contains(x);
    }

    private static boolean checkY(double y) {
        return  y >= -5.0 && y <= 5.0;
    }

    private static boolean checkR(double r) {
        List<Double> validXValues = Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0);
        return validXValues.contains(r);
    }

}
