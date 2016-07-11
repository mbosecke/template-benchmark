package com.mitchellbosecke.benchmark;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Utils {

    public static String readResource(String name) throws IOException {
        StringBuilder builder = new StringBuilder();
        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(Utils.class.getClassLoader().getResourceAsStream(name))
        )) {
            for (;;) {
                int c = in.read();
                if (c == -1) {
                    break;
                }
                builder.append((char) c);
            }
        }
        return builder.toString();
    }

}
