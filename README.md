template-benchmark
================

JMH benchmark for the the most popular Java template engines.

1. Download the source code and build it (`mvn clean install`)
2. Run the benchmark suite with `java -jar target/benchmarks.jar`

Interpreting the Results
========================
The benchmarks measure throughput, given in "ops/time". The time unit used is seconds. 
Generally, the score represents the number of templates compiled or rendered per second; the higher the score, the better.
 

Example Output
===============
The following benchmark was run on a machine with the following stats:

* OS: CentOS 7
* Kernel: 3.10.0-123.el7.x86_64
* Memory: 8GB
* Processor: Intel(R) Core(TM) i5-3470 CPU @ 3.20GHz

````
# JMH 1.6.1 (released 4 days ago)
# VM invoker: /usr/java/jdk1.7.0_67/jre/bin/java
# VM options: <none>
# Warmup: 5 iterations, 1 s each
# Measurement: 5 iterations, 1 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time

(...)
# Run complete. Total time: 00:04:17

Benchmark                       Mode  Cnt      Score     Error  Units
FreemarkerBenchmark.benchmark  thrpt   25  15115.388 ± 228.536  ops/s
MoustacheBenchmark.benchmark   thrpt   25  32840.615 ± 275.136  ops/s
PebbleBenchmark.benchmark      thrpt   25  17475.170 ± 120.908  ops/s
ThymeleafBenchmark.benchmark   thrpt   25    776.660 ±  31.788  ops/s
VelocityBenchmark.benchmark    thrpt   25  18752.055 ± 131.758  ops/s
````
