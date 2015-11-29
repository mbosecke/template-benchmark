package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.benchmark.model.Stock;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.rythmengine.RythmEngine;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Rythm extends BaseBenchmark {
    private List<Stock> items;
    private RythmEngine rythmEngine;
    private File template;

    @Setup
    public void setup() {
        this.items = Stock.dummyItems();
        Map<String, Object> conf = new HashMap<>();
        conf.put("template.home", new File("src/main/resources"));
        this.rythmEngine = new RythmEngine(conf);
        this.template = new File("/Users/sean/IdeaProjects/template-benchmark/src/main/resources/templates/stocks.rythm.raw");

    }

    @Benchmark
    public String benchmark() {
        return rythmEngine.render(template, items);
    }

}
