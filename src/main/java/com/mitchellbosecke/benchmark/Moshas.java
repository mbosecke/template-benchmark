package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.concurrent.atomic.AtomicInteger;
import net.unit8.moshas.Context;
import net.unit8.moshas.Snippet;
import net.unit8.moshas.Template;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

/**
 *
 * @author kawasima
 */
public class Moshas extends BaseBenchmark {
    private Template template;

    private Context context;

    @Setup
    public void setup() throws IOException {
        
        template = Template.define(getClass().getClassLoader().getResource("templates/stocks.moshas.html"), t -> {
            Snippet stockSnippet = Snippet.define(t.select("tbody > tr"), s -> {
                s.root((el, ctx) -> {
                    el.addClass(ctx.getInt("itemIndex") % 2 == 0 ? "even" : "odd");
                });
                s.select("td:eq(0)", (el, ctx) -> { el.text(ctx.getString("itemIndex")); });
                s.select("td:eq(1) > a", (el, ctx) -> {
                    el.attr("href", "/stocks/" + (String) ctx.get("stock", "symbol"));
                    el.text((String) ctx.get("stock", "symbol"));
                });
                s.select("td:eq(2) > a", (el, ctx) -> {
                    el.attr("href", ctx.getString("stock", "url"));
                    el.text(ctx.getString("stock", "name"));
                });
                s.select("td:eq(3) > strong", (el, ctx) -> { el.text(ctx.getString("stock", "price")); });
                s.select("td:eq(4)", (el, ctx) -> {
                    if (ctx.getDouble("stock", "change") < 0) {
                        el.addClass("minus");
                    }
                    el.text(ctx.getString("stock", "change"));
                });
                s.select("td:eq(5)", (el, ctx) -> {
                    if (ctx.getDouble("stock", "change") < 0) {
                        el.addClass("minus");
                    }
                    el.text(ctx.getString("stock", "ratio"));
                });
                
            });
            
            t.select("tbody", (el, ctx) -> {
                el.children().remove();
                AtomicInteger counter = new AtomicInteger(0);
                ctx.getCollection("items").forEach(item -> {
                    ctx.localScope("stock", item, "itemIndex", counter.incrementAndGet(), () -> {
                        el.appendChild(stockSnippet.render(ctx));
                    });
                });
            });
            
        });
        context = new Context(getContext());
    }

    @Benchmark
    public String benchmark() throws IOException {
        Writer writer = new StringWriter();
        template.render(context, writer);
        return writer.toString();
    }
    
}
