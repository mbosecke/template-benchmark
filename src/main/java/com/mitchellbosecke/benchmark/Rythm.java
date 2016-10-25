package com.mitchellbosecke.benchmark;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.rythmengine.RythmEngine;

import java.io.IOException;
import java.util.Properties;

public class Rythm extends BaseBenchmark {

    RythmEngine engine;

    String template;

    @Setup
    public void setup() throws IOException {
        Properties properties = new Properties();
        properties.put("log.enabled", false);
        properties.put("feature.smart_escape.enabled", false);
        properties.put("feature.transform.enabled", false);
        engine = new RythmEngine(properties);

        template = Utils.readResource("templates/stocks.rythm.html");
    }

    @Benchmark
    public String benchmark() {
        return engine.renderString(template, getContext());
    }
}
