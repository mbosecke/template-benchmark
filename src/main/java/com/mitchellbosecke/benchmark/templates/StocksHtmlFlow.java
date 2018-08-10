package com.mitchellbosecke.benchmark.templates;

import com.mitchellbosecke.benchmark.model.Stock;
import htmlflow.DynamicHtml;
import org.xmlet.htmlapifaster.EnumHttpEquivType;
import org.xmlet.htmlapifaster.EnumMediaType;
import org.xmlet.htmlapifaster.EnumRelType;
import org.xmlet.htmlapifaster.EnumTypeContentType;
import org.xmlet.htmlapifaster.EnumTypeScriptType;

import java.util.List;
import java.util.stream.IntStream;

public class StocksHtmlFlow {

    public static DynamicHtml<List<Stock>> view = DynamicHtml.view(StocksHtmlFlow::templateStocks);

    private static void templateStocks(DynamicHtml<List<Stock>> view, List<Stock> stocks) {
        view
            .html()
                .head()
                    .title().text("Stock Prices").__()
                    .meta()
                        .attrHttpEquiv(EnumHttpEquivType.CONTENT_TYPE)
                        .attrContent("text/html; charset=UTF-8")
                    .__()
                    .meta()
                        .addAttr("http-equiv", "Content-Style-Type")
                        .attrContent("text/CSS")
                    .__()
                    .meta()
                        .addAttr("http-equiv", "Content-Script-Type")
                        .attrContent("text/javascript")
                    .__()
                    .link()
                        .addAttr("rel", "shortcut icon")
                        .attrHref("/images/favicon.ico")
                    .__()
                    .link()
                        .attrRel(EnumRelType.STYLESHEET)
                        .attrType(EnumTypeContentType.TEXT_CSS)
                        .attrHref("/CSS/style.CSS")
                        .attrMedia(EnumMediaType.ALL)
                    .__()
                    .script()
                        .attrType(EnumTypeScriptType.TEXT_JAVASCRIPT)
                        .attrSrc("/js/util.js")
                    .__()
                    .style()
                        .attrType(EnumTypeContentType.TEXT_CSS)
                        .text(STOCKS_CSS)
                    .__()
                .__() // head
                .body()
                    .h1().text("Stock Prices").__()
                    .table()
                        .thead()
                            .tr()
                                .th().text("#").__()
                                .th().text("symbol").__()
                                .th().text("name").__()
                                .th().text("price").__()
                                .th().text("change").__()
                                .th().text("ratio").__()
                            .__() // tr
                        .__() // thead
                        .tbody()
                        .of(tbody -> IntStream
                            .rangeClosed(1, stocks.size())
                            .forEach(index -> {
                                Stock stock = stocks.get(index-1);
                                tbody
                                    .tr()
                                    .dynamic(tr -> tr.attrClass(index % 2 == 0 ? "even" : "odd"))
                                        .td()
                                            .dynamic(td -> td.text(index ))
                                        .__()
                                        .td()
                                            .a().dynamic(a -> a.attrHref("/stocks/" + stock.getSymbol()).text(stock.getSymbol())).__()
                                        .__()
                                        .td()
                                            .a().dynamic(a -> a.attrHref(stock.getUrl()).text(stock.getName())).__()
                                        .__()
                                        .td()
                                            .strong().dynamic(strong -> strong.text(stock.getPrice())).__()
                                        .__()
                                        .td()
                                            .dynamic(td -> {
                                                double change = stock.getChange();
                                                if (change < 0) {
                                                    td.attrClass("minus");
                                                }
                                                td.text(change);
                                            })
                                        .__()
                                        .td()
                                            .dynamic(td -> {
                                                double ratio = stock.getRatio();
                                                if (ratio < 0) {
                                                    td.attrClass("minus");
                                                }
                                                td.text(ratio);
                                            })
                                        .__() // td
                                    .__(); // tr
                            })
                        )
                        .__() // tbody
                    .__() // table
                .__() // body
            .__(); // html
    }

    private static final String STOCKS_CSS = "/*<![CDATA[*/\n" +
        "body {\n" +
        "\tcolor: #333333;\n" +
        "\tline-height: 150%;\n" +
        "}\n" +
        "\n" +
        "thead {\n" +
        "\tfont-weight: bold;\n" +
        "\tbackground-color: #CCCCCC;\n" +
        "}\n" +
        "\n" +
        ".odd {\n" +
        "\tbackground-color: #FFCCCC;\n" +
        "}\n" +
        "\n" +
        ".even {\n" +
        "\tbackground-color: #CCCCFF;\n" +
        "}\n" +
        "\n" +
        ".minus {\n" +
        "\tcolor: #FF0000;\n" +
        "}\n" +
        "\n" +
        "/*]]>*/";
}
