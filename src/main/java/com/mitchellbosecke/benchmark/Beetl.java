package com.mitchellbosecke.benchmark;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.net.URL;
import java.util.Map;

import org.beetl.core.Configuration;
import org.beetl.core.GroupTemplate;
import org.beetl.core.Template;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;




public class Beetl extends BaseBenchmark {

    private Map<String, Object> context;

    private Template template;

    @Setup
    public void setup() throws IOException {
    	ClasspathResourceLoader resourceLoader = new MyClasspathResourceLoader("/");
    	Configuration cfg = Configuration.defaultConfiguration();
    	cfg.setStatementStart("@");
    	cfg.setStatementEnd(null);
    	cfg.getResourceMap().put("autoCheck", "false");
    	GroupTemplate gt = new GroupTemplate(resourceLoader, cfg);
    	template = gt.getTemplate("/templates/stocks.beetl.html");
    	template.binding(getContext());
    }

    @Benchmark
    public String benchmark() throws IOException {
        Writer writer = new StringWriter();
        template.renderTo(writer);
       
        return writer.toString();
    }

    static class MyClasspathResourceLoader extends ClasspathResourceLoader{
    	
    	public MyClasspathResourceLoader(String root)
    	{
    		super(root);
    	}
    	@Override
    	public void init(GroupTemplate gt)
    	{
    		Map<String, String> resourceMap = gt.getConf().getResourceMap();
    		

    		if (this.charset == null)
    		{
    			this.charset = resourceMap.get("charset");

    		}

    	
    		this.setAutoCheck(false);
    		

    	}
    }
}
