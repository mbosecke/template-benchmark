package com.mitchellbosecke.benchmark;

import com.x5.template.Theme;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;

public class Chunk extends BaseBenchmark {

    private com.x5.template.Chunk chunk;

    @Setup
    public void setup() throws IOException {
        Theme theme = new Theme("templates", "");
        theme.setClasspathThemesFolder("/templates");
        chunk = theme.makeChunk("stocks.chunk");
    }

    @Benchmark
    public String benchmark() {
        chunk.setMultiple(getContext());
        return chunk.toString();
    }
}