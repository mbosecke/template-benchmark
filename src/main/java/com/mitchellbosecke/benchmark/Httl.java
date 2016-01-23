package com.mitchellbosecke.benchmark;

import httl.Engine;
import httl.Template;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.text.ParseException;
import java.util.Properties;

public class Httl extends BaseBenchmark {

    private Engine engine;

    private Template template;

    @Setup
    public void setup() throws IOException, ParseException {
        Properties prop = new Properties();
        prop.setProperty("import.packages", "com.mitchellbosecke.benchmark.model,java.util");
        prop.setProperty("filter", "null");
        prop.setProperty("logger", "null");
        engine = Engine.getEngine(prop);

        template = engine.getTemplate("templates/stocks.httl.html");
    }

    @Benchmark
    public String benchmark() throws IOException, ParseException {
        Writer writer = new StringWriter();
        template.render(getContext(), writer);
        return writer.toString();
    }

}
