package com.mitchellbosecke.benchmark;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.jknack.handlebars.*;
import com.github.jknack.handlebars.Handlebars.SafeString;
import com.github.jknack.handlebars.context.MapValueResolver;
import com.github.jknack.handlebars.io.ClassPathTemplateLoader;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;

public class JsonHandlebars extends BaseBenchmark {

  private Context context;

  private Template template;

  @Setup
  public void setup() throws IOException {
    template = new com.github.jknack.handlebars.Handlebars(new ClassPathTemplateLoader("/", ".html"))
            .registerHelper("minus", new Helper<JsonNode>() {
              @Override
              public CharSequence apply(final JsonNode stock, final Options options)
                  throws IOException {
                return stock.get("change").asDouble() < 0 ? new SafeString("class=\"minus\"") : null;
              }
            }).compile("templates/stocks.hbs");
    this.context = Context.newBuilder(new ObjectMapper().valueToTree(getContext()))
            .resolver(JsonNodeValueResolver.INSTANCE, MapValueResolver.INSTANCE)
            .build();
  }

  @Benchmark
  public String benchmark() throws IOException {
    return template.apply(context);
  }

}
