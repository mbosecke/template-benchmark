package com.mitchellbosecke.benchmark;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.AbstractCollection;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import org.openjdk.jmh.annotations.Benchmark;
import org.openjdk.jmh.annotations.Setup;

import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.MustacheException;
import com.github.mustachejava.MustacheFactory;
import com.google.common.base.Function;

public class Mustache extends BaseBenchmark {

    private Map<String, Object> context;

    private com.github.mustachejava.Mustache template;

    @SuppressWarnings("unchecked")
    @Setup
    public void setup() {
        MustacheFactory mustacheFactory = new DefaultMustacheFactory() {

            @Override
            public void encode(String value, Writer writer) {
                // Disable HTML escaping
                try {
                    writer.write(value);
                } catch (IOException e) {
                    throw new MustacheException(e);
                }
            }
        };
        template = mustacheFactory.compile("templates/stocks.mustache.html");
        Map<String, Object> data = getContext();
        // TODO this is not nice but I'm not aware of any better solution
        data.put("items", new DecoratedCollection<Object>((Collection<Object>) data.get("items")));
        data.put("negativeClass", new Function<String, String>() {
            @Override
            public String apply(String input) {
                if (input == null || input.length() == 0) {
                    return "";
                }
                Double value = Double.valueOf(input);
                return value > 0 ? "" : " class=\"minus\"";
            }
        });
        data.put("rowClass", new Function<String, String>() {
            @Override
            public String apply(String input) {
                Integer value = Integer.valueOf(input);
                return (value.intValue() % 2 == 0) ? "even" : "odd";
            }
        });
        this.context = data;
    }

    @Benchmark
    public String benchmark() {
        Writer writer = new StringWriter();
        template.execute(writer, context);
        return writer.toString();
    }

    /**
     * This is a modified copy of {@link com.github.mustachejava.util.DecoratedCollection} - we need the first element at index 1.
     *
     * @param <T>
     */
    private class DecoratedCollection<T> extends AbstractCollection<Element<T>> {

        private final Collection<T> c;

        public DecoratedCollection(Collection<T> c) {
            this.c = c;
        }

        @Override
        public Iterator<Element<T>> iterator() {
            final Iterator<T> iterator = c.iterator();
            return new Iterator<Element<T>>() {
                int index = 1;

                @Override
                public boolean hasNext() {
                    return iterator.hasNext();
                }

                @Override
                public Element<T> next() {
                    T next = iterator.next();
                    int current = index++;
                    return new Element<T>(current, current == 1, !iterator.hasNext(), next);
                }

                @Override
                public void remove() {
                    throw new UnsupportedOperationException();
                }
            };
        }

        @Override
        public int size() {
            return c.size();
        }
    }

    class Element<T> {
        public final int index;
        public final boolean first;
        public final boolean last;
        public final T value;

        public Element(int index, boolean first, boolean last, T value) {
            this.index = index;
            this.first = first;
            this.last = last;
            this.value = value;
        }
    }

}
