package beans;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class Result {
    private final double x;
    private final double y;
    private final double r;
    private final long timestamp;
    private final boolean hit;

    public Result(double x, double y, double r, boolean hit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.timestamp = LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(3));
        this.hit = hit;
    }

    public double getX() { return x; }
    public double getY() { return y; }
    public double getR() { return r; }
    public long getTimestamp() { return timestamp; }
    public boolean isHit() { return hit; }
}