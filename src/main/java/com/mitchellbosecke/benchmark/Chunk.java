package com.mitchellbosecke.benchmark;

import com.x5.template.Theme;
import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import java.io.IOException;
import java.net.JarURLConnection;
import java.net.URL;

public class Chunk extends BaseBenchmark {

    private com.x5.template.Chunk chunk;

    private String getResourcePath(String location) throws IOException {
        URL resourceUrl = this.getClass().getResource(location);
        switch (resourceUrl.getProtocol()) {
            case "file":
                return resourceUrl.getFile();
            case "jar":
                JarURLConnection jarUrl = (JarURLConnection) resourceUrl.openConnection();
                return jarUrl.getJarFile().getName();
            default:
                throw new IllegalArgumentException("Invalid location!");
        }
    }

    @Setup
    public void setup() throws IOException {
        Theme theme = new Theme(getResourcePath("/templates"), "");
        chunk = theme.makeChunk("stocks.chunk");
    }

    @Benchmark
    public String benchmark() {
        chunk.setMultiple(getContext());
        return chunk.toString();
    }

}
