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

Configuration configuration ;

    @Setup
    public void setup() throws IOException {
         configuration = new Configuration(Configuration.VERSION_2_3_22);
        configuration.setTemplateLoader(new ClassTemplateLoader(getClass(), "/"));
       
    }

    @Benchmark
    public String benchmark() throws TemplateException, IOException {
        Writer writer = new StringWriter();
        Template template = configuration.getTemplate("templates/stocks.freemarker.html"); template.process(getContext(), writer);
        return writer.toString();
    }

}
