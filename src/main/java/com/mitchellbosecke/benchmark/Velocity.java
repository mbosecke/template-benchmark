package com.mitchellbosecke.benchmark;

import java.io.StringWriter;
import java.io.Writer;
import java.util.Properties;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

public class Velocity extends BaseBenchmark {

	VelocityEngine engine = null;

	@Setup
	public void setup() {
		Properties configuration = new Properties();
		configuration.setProperty("resource.loader", "class");
		configuration.setProperty("class.resource.loader.class",
				"org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");

		engine = new VelocityEngine(configuration);
	}

	@Benchmark
	public String benchmark() {
		VelocityContext context = new VelocityContext(getContext());
		Template template = engine.getTemplate("templates/stocks.velocity.html", "UTF-8");
		Writer writer = new StringWriter();
		template.merge(context, writer);
		return writer.toString();
	}

}
