package com.mitchellbosecke.benchmark;

import com.x5.template.Theme;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;

public class Chunk extends BaseBenchmark {

    private com.x5.template.Chunk chunk;

    @Setup
    public void setup() throws URISyntaxException {
        URI templatesUri = this.getClass().getResource("/templates").toURI();
        File templatesDir = new File(templatesUri);

        Theme theme = new Theme(templatesDir.toString(), "");
        chunk = theme.makeChunk("stocks.chunk");
    }

    @Benchmark
    public String benchmark() {
        chunk.setMultiple(getContext());
        return chunk.toString();
    }

}
