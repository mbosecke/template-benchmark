package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.benchmark.model.Stock;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.util.List;

/**
 * Benchmark for Scala template engine.
 * 
 * @author lauraluiz
 */
public class Twirl extends BaseBenchmark {

    private List<Stock> items;

    @Setup
    public void setup() throws IOException {
        // no config needed, replicate stocks from context
        this.items = Stock.dummyItems();
    }

    @Benchmark
    public String benchmark() throws IOException {
        return templates.html.stocks.render(this.items).toString();
    }

}
