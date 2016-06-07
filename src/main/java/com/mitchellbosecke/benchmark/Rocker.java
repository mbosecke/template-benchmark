package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.benchmark.model.Stock;
import freemarker.template.TemplateException;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.util.List;

/**
 * Benchmark for Rocker template engine by Fizzed.
 * 
 * https://github.com/fizzed/rocker
 * 
 * @author joelauer
 */
public class Rocker extends BaseBenchmark {

    private List<Stock> items;

    @Setup
    public void setup() throws IOException {
        // no config needed, replicate stocks from context
        this.items = Stock.dummyItems();
    }

    @Benchmark
    public String benchmark() throws TemplateException, IOException {
        return templates.stocks
                .template(this.items)
                .render()
                .toString();
    }

}
