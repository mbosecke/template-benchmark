package com.mitchellbosecke.benchmark;

import com.mitchellbosecke.pebble.error.PebbleException;
import freemarker.template.TemplateException;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.Locale;

import static org.junit.Assert.assertEquals;
import com.hubspot.jinjava.*;
import org.junit.BeforeClass;
import org.junit.Test;

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
        Freemarker freemarker = new Freemarker();
        freemarker.setup();
        assertOutput(freemarker.benchmark());
    }

    @Test
    public void testRockerOutput() throws IOException, TemplateException {
        Rocker rocker = new Rocker();
        rocker.setup();
        assertOutput(rocker.benchmark());
    }
//
//    @Test
//    public void testPebbleOutput() throws IOException, PebbleException {
//        Pebble pebble = new Pebble();
//        pebble.setup();
//        assertOutput(pebble.benchmark());
//    }
//
//    @Test
//    public void testVelocityOutput() throws IOException {
//        Velocity velocity = new Velocity();
//        velocity.setup();
//        assertOutput(velocity.benchmark());
//    }
//
//    @Test
//    public void testMustacheOutput() throws IOException {
//        Mustache mustache = new Mustache();
//        mustache.setup();
//        assertOutput(mustache.benchmark());
//    }
//
//    @Test
//    public void testThymeleafOutput() throws IOException, TemplateException {
//        Thymeleaf thymeleaf = new Thymeleaf();
//        thymeleaf.setup();
//        assertOutput(thymeleaf.benchmark());
//    }
//
//    @Test
//    public void testTrimouOutput() throws IOException {
//        Trimou trimou = new Trimou();
//        trimou.setup();
//        assertOutput(trimou.benchmark());
//    }
//
//    @Test
//    public void testHbsOutput() throws IOException {
//        Handlebars hbs = new Handlebars();
//        hbs.setup();
//        assertOutput(hbs.benchmark());
//    }
    
    
    @Test
    public void testBeetl() throws IOException {
        Beetl beetl = new Beetl();
        beetl.setup();
        assertOutput(beetl.benchmark());
    }

    @Test
    public void testRythmOutput() throws IOException {
        Rythm rythm = new Rythm();
        rythm.setup();
        assertOutput(rythm.benchmark());
    }

    @Test
    public void testChunkOutput() throws IOException, URISyntaxException {
        Chunk chunk = new Chunk();
        chunk.setup();
        assertOutput(chunk.benchmark());
    }

    @Test
    public void testHttlOutput() throws IOException, ParseException {
        Httl httl = new Httl();
        httl.setup();
        assertOutput(httl.benchmark());
    }

    @Test
    public void testJsonHbsOutput() throws IOException {
        JsonHandlebars hbs = new JsonHandlebars();
        hbs.setup();
        assertOutput(hbs.benchmark());
    }
    
    private void assertOutput(String output) throws IOException {
        assertEquals(readExpectedOutputResource().toLowerCase(), output.replaceAll("\\s", "").toLowerCase());
    @Test
    public void testTwirlOutput() throws IOException {
        Twirl twirl = new Twirl();
        twirl.setup();
        assertOutput(twirl.benchmark());
    }

    @Test
    public void testJinjavaOutput() throws IOException {
        Jinjava jinjava = new Jinjava();
        jinjava.setup();
        assertOutput(jinjava.benchmark());
    }

    private void assertOutput(final String output) throws IOException {
        assertEquals(Utils.readResource("expected-output.html").replaceAll("\\s", ""), output.replaceAll("\\s", ""));
    }

}
