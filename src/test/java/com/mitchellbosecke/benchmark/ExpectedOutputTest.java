package com.mitchellbosecke.benchmark;

import static org.junit.Assert.assertEquals;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.Locale;

import org.junit.BeforeClass;
import org.junit.Test;

import com.mitchellbosecke.pebble.error.PebbleException;

import freemarker.template.TemplateException;

/**
 *
 * @author Martin Kouba
 */
public class ExpectedOutputTest {

    @BeforeClass
    public static void beforeClass() {
        Locale.setDefault(Locale.ENGLISH);
    }

    @Test
    public void testFreemarkerOutput() throws IOException, TemplateException {
        final Freemarker freemarker = new Freemarker();
        freemarker.setup();
        assertOutput(freemarker.benchmark());
    }

    @Test
    public void testRockerOutput() throws IOException, TemplateException {
        final Rocker rocker = new Rocker();
        rocker.setup();
        assertOutput(rocker.benchmark());
    }

    @Test
    public void testPebbleOutput() throws IOException, PebbleException {
        final Pebble pebble = new Pebble();
        pebble.setup();
        assertOutput(pebble.benchmark());
    }

    @Test
    public void testVelocityOutput() throws IOException {
        final Velocity velocity = new Velocity();
        velocity.setup();
        assertOutput(velocity.benchmark());
    }

    @Test
    public void testMustacheOutput() throws IOException {
        final Mustache mustache = new Mustache();
        mustache.setup();
        assertOutput(mustache.benchmark());
    }

    @Test
    public void testThymeleafOutput() throws IOException, TemplateException {
        final Thymeleaf thymeleaf = new Thymeleaf();
        thymeleaf.setup();
        assertOutput(thymeleaf.benchmark());
    }

    @Test
    public void testTrimouOutput() throws IOException {
        final Trimou trimou = new Trimou();
        trimou.setup();
        assertOutput(trimou.benchmark());
    }

    @Test
    public void testHbsOutput() throws IOException {
        final Handlebars hbs = new Handlebars();
        hbs.setup();
        assertOutput(hbs.benchmark());
    }

    @Test
    public void testBeetl() throws IOException {
        final Beetl beetl = new Beetl();
        beetl.setup();
        assertOutput(beetl.benchmark());
    }

    @Test
    public void testRythmOutput() throws IOException {
        final Rythm rythm = new Rythm();
        rythm.setup();
        assertOutput(rythm.benchmark());
    }

    @Test
    public void testChunkOutput() throws IOException, URISyntaxException {
        final Chunk chunk = new Chunk();
        chunk.setup();
        assertOutput(chunk.benchmark());
    }

    @Test
    public void testHttlOutput() throws IOException, ParseException {
        final Httl httl = new Httl();
        httl.setup();
        assertOutput(httl.benchmark());
    }

    @Test
    public void testJinjavaOutput() throws IOException {
        final Jinjava jinjava = new Jinjava();
        jinjava.setup();
        assertOutput(jinjava.benchmark());
    }

    private void assertOutput(final String output) throws IOException {
        assertEquals(readExpectedOutputResource(), output.replaceAll("\\s", ""));
    }

    private String readExpectedOutputResource() throws IOException {
        final StringBuilder builder = new StringBuilder();
        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(ExpectedOutputTest.class.getResourceAsStream("/expected-output.html")))) {
            for (;;) {
                final String line = in.readLine();
                if (line == null) {
                    break;
                }
                builder.append(line);
            }
        }
        // Remove all whitespaces
        return builder.toString().replaceAll("\\s", "");
    }

}
