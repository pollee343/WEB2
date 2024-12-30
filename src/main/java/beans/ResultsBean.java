package beans;

import java.util.ArrayList;
import java.util.List;

public class ResultsBean {
    private final List<Result> results;

    public ResultsBean() {
        results = new ArrayList<>();
    }

    public List<Result> getResults() {
        return results;
    }

    public void addResult(Result result) {
        results.add(0, result); // Добавление в начало списка
    }
}
