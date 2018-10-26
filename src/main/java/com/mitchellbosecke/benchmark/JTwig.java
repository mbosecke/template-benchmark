package com.mitchellbosecke.benchmark;

import org.jtwig.JtwigModel;
import org.jtwig.JtwigTemplate;
import org.jtwig.environment.EnvironmentConfiguration;
import org.jtwig.environment.EnvironmentConfigurationBuilder;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;

public class JTwig extends BaseBenchmark {

    JtwigTemplate template;
    JtwigModel model;

    @Setup
    public void setup() throws IOException {
        //disable any escaping
        EnvironmentConfiguration build = EnvironmentConfigurationBuilder
                .configuration()
                .escape().withInitialEngine("none")
                .withDefaultEngine("none")
                .and().build();

        template = JtwigTemplate.classpathTemplate("templates/stocks.twig.html", build);
        model = JtwigModel.newModel(getContext());
    }

    @Benchmark
    public String benchmark() throws IOException {
        return template.render(model);
    }
}
