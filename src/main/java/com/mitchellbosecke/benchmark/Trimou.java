package com.mitchellbosecke.benchmark;

import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.trimou.engine.MustacheEngineBuilder;
import org.trimou.engine.config.EngineConfigurationKey;
import org.trimou.engine.locator.ClassPathTemplateLocator;
import org.trimou.engine.resolver.CombinedIndexResolver;
import org.trimou.handlebars.HelpersBuilder;
import org.trimou.handlebars.NumberMatchingHelper;

public class Trimou extends BaseBenchmark {

    private Map<String, Object> context;

    private org.trimou.Mustache template;

    @Setup
    public void setup() {
        template = MustacheEngineBuilder
                .newBuilder()
                // Disable HTML escaping
                .setProperty(EngineConfigurationKey.SKIP_VALUE_ESCAPING, true)
                // Disable useless resolver
                .setProperty(CombinedIndexResolver.ENABLED_KEY, false)
                .addTemplateLocator(ClassPathTemplateLocator.builder(1).setRootPath("templates").setScanClasspath(false).setSuffix("trimou.html").build())
                .registerHelpers(HelpersBuilder.extra().add("isNegative", new NumberMatchingHelper() {
                    @Override
                    protected boolean isMatching(Number value) {
                        if (value instanceof Double) {
                            return value.doubleValue() < 0;
                        }
                        // TODO other number types
                        return false;
                    }
                }).build()).build().getMustache("stocks");
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() {
        return template.render(context);
    }

}
