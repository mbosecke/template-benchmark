package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.pebble.PebbleEngine;
import com.mitchellbosecke.pebble.error.PebbleException;
import com.mitchellbosecke.pebble.template.PebbleTemplate;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.io.StringWriter;
import java.util.Map;

public class Pebble extends BaseBenchmark {

    private Map<String, Object> context;

    private PebbleTemplate template;

    @Setup
    public void setup() throws PebbleException {
        PebbleEngine engine = new PebbleEngine.Builder().autoEscaping(false).build();
        template = engine.getTemplate("templates/stocks.pebble.html");
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() throws PebbleException, IOException {
        StringWriter writer = new StringWriter();
        template.evaluate(writer, context);
        return writer.toString();
    }

}
