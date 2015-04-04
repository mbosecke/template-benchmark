package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import freemarker.cache.ClassTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class Freemarker extends BaseBenchmark {

    private Map<String, Object> context;

    private Template template;

    @Setup
    public void setup() throws IOException {
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_22);
        configuration.setTemplateLoader(new ClassTemplateLoader(getClass(), "/"));
        template = configuration.getTemplate("templates/stocks.freemarker.html");
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() throws TemplateException, IOException {
        Writer writer = new StringWriter();
        template.process(context, writer);
        return writer.toString();
    }

}
