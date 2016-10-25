package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Locale;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import freemarker.template.TemplateException;

public class Thymeleaf extends BaseBenchmark {

    private TemplateEngine engine;

    private IContext context;

    @Setup
    public void setup() throws IOException {
        engine = new TemplateEngine();
        engine.setTemplateResolver(new ClassLoaderTemplateResolver());
        context = new Context(Locale.getDefault(), getContext());
    }

    @Benchmark
    public String benchmark() throws TemplateException, IOException {
        Writer writer = new StringWriter();
        engine.process("templates/stocks.thymeleaf.html", context, writer);
        return writer.toString();
    }

}
