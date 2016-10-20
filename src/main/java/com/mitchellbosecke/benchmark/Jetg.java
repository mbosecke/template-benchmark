package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.text.ParseException;
import java.util.Map;
import java.util.Properties;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import com.dyuproject.jetg.JetConfig;
import com.dyuproject.jetg.JetEngine;
import com.dyuproject.jetg.JetTemplate;
import com.dyuproject.jetg.resource.loader.ClasspathResourceLoader;

/**
 * Jetg template benchmark.
 * 
 * @author David Yu
 * @created Oct 20, 2016
 */
public class Jetg extends BaseBenchmark
{
    private Map<String, Object> context;
    private JetEngine engine;
    private JetTemplate template;
    
    @Setup
    public void setup() throws IOException {
        Properties props = new Properties();
        props.put(JetConfig.COMPILE_DEBUG, "false");
        props.put(JetConfig.IMPORT_PACKAGES, "com.mitchellbosecke.benchmark.model.*");
        props.put(JetConfig.TEMPLATE_LOADER, ClasspathResourceLoader.class.getName());
        props.put(JetConfig.TEMPLATE_PATH, "/");
        props.put(JetConfig.COMPILE_STRATEGY, "auto");
        props.put(JetConfig.TEMPLATE_SUFFIX, ".jetg.html");
        props.put(JetConfig.COMPILE_PATH, "target/generated-sources/jetg");
        
        engine = JetEngine.create(props);
        template = engine.getTemplate("templates/stocks.jetg.html");
        context = getContext();
    }
    
    @Benchmark
    public String benchmark() throws IOException {
        StringWriter writer = new StringWriter();
        template.render(context, writer);
        return writer.toString();
    }
}
