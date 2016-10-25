package com.mitchellbosecke.benchmark;

import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.mitchellbosecke.pebble.PebbleEngine;
import com.mitchellbosecke.pebble.error.PebbleException;
import com.mitchellbosecke.pebble.extension.escaper.EscaperExtension;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

public class Jinjava extends BaseBenchmark {
    private com.hubspot.jinjava.Jinjava jinjava;
    private Map<String, Object> context;
    String template;


    @Setup
    public void setup() throws IOException {
        this.jinjava = new com.hubspot.jinjava.Jinjava();
        this.template = Resources.toString(Resources.getResource("templates/stocks.jinjava.html"), Charsets.UTF_8);
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() throws IOException {
        return jinjava.render(template, context);
    }

}
