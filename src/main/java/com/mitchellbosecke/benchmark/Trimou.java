package com.mitchellbosecke.benchmark;

import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;
import org.trimou.engine.MustacheEngineBuilder;
import org.trimou.engine.config.EngineConfigurationKey;
import org.trimou.engine.locator.ClassPathTemplateLocator;
import org.trimou.engine.resolver.CombinedIndexResolver;
import org.trimou.handlebars.BasicValueHelper;
import org.trimou.handlebars.HelpersBuilder;
import org.trimou.handlebars.Options;

public class Trimou extends BaseBenchmark {

    private Map<String, Object> context;

    private org.trimou.Mustache template;

    @Setup
    public void setup() {
        template = MustacheEngineBuilder.newBuilder()
                // Disable HTML escaping
                .setProperty(EngineConfigurationKey.SKIP_VALUE_ESCAPING, true)
                // Disable useless resolver
                .setProperty(CombinedIndexResolver.ENABLED_KEY, false)
                .addTemplateLocator(ClassPathTemplateLocator.builder(1).setRootPath("templates").setScanClasspath(false).setSuffix("trimou.html").build())
                .registerHelpers(HelpersBuilder.extra().build())
                // This is a single purpose helper
                // It's a pity we can't use JDK8 extension and SimpleHelpers util class
                .registerHelper("minusClass", new BasicValueHelper() {
                    @Override
                    public void execute(Options options) {
                        Object value = options.getParameters().get(0);
                        if (value instanceof Double && (Double) value < 0) {
                            options.append(" class=\"minus\"");
                        }
                        // We don't handle any other number types
                    }
                }).build().getMustache("stocks");
        this.context = getContext();
    }

    @Benchmark
    public String benchmark() {
        return template.render(context);
    }

}
