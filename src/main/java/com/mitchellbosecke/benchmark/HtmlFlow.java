package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.benchmark.model.Stock;
import com.mitchellbosecke.benchmark.templates.StocksHtmlFlow;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

public class HtmlFlow extends BaseBenchmark {

  private List<Stock> stocks;

  @Setup
  public void setup() throws IOException {
    this.stocks = Stock.dummyItems();
  }

  @Benchmark
  public String benchmark() throws IOException {
    return StocksHtmlFlow.view.render(stocks);
  }
}
