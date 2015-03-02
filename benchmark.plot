# Labels
set title 'Java Template Engine Performance Comparison'
set ylabel 'Templates rendered per second'
set xlabel 'Template Engine'
set xtics nomirror rotate by -45

# Ranges
set autoscale

# Input
set datafile separator ','

# Output
set terminal pngcairo enhanced font "Verdana,9"
set output 'results.png'
set grid
set key off
set boxwidth 0.8 relative

# box style
set style line 1 lc rgb '#5C91CD' lt 1
set style fill solid

# remove top and right borders
set style line 2 lc rgb '#808080' lt 1
set border 3 back ls 2
set tics nomirror

plot 'results.csv' every ::1 using 0:5:xticlabels(stringcolumn(1)[31:36]) with boxes ls 1,\
    'results.csv' every ::1 using 0:($5 + 1500):(sprintf("%d",$5)) with labels
