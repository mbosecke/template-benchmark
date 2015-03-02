package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.MustacheException;
import com.github.mustachejava.MustacheFactory;

public class Mustache extends BaseBenchmark {

    private Map<String, Object> context;

    private com.github.mustachejava.Mustache template;

    @Setup
    public void setup() {
        MustacheFactory mustacheFactory = new DefaultMustacheFactory() {

            @Override
            public void encode(String value, Writer writer) {
                // Disable HTML escaping
                try {
                    writer.write(value);
                } catch (IOException e) {
                    throw new MustacheException(e);
                }
            }
        };
        template = mustacheFactory.compile("templates/stocks.mustache.html");
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() {
        Writer writer = new StringWriter();
        template.execute(writer, context);
        return writer.toString();
    }

}
