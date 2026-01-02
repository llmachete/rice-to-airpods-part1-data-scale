'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  year: number;
  scale: number; // in bytes
  scaleLabel: string;
  physical: string;
  annotation: string;
}

const TIMELINE_DATA: DataPoint[] = [
  {
    year: 1981,
    scale: 64_000, // 64 KB
    scaleLabel: '64 KB',
    physical: '64 coffee cups',
    annotation: '📟 IBM PC',
  },
  {
    year: 2000,
    scale: 1_000_000_000, // 1 GB
    scaleLabel: '1 GB',
    physical: '1 shipping container',
    annotation: '💿 CD-ROM era',
  },
  {
    year: 2010,
    scale: 1_000_000_000_000, // 1 TB
    scaleLabel: '1 TB',
    physical: 'Small warehouse',
    annotation: '📱 Smartphone boom',
  },
  {
    year: 2023,
    scale: 120_000_000_000_000_000_000_000, // 120 ZB
    scaleLabel: '120 ZB',
    physical: '120 ocean lakes',
    annotation: '🌊 Big Data era',
  },
  {
    year: 2025,
    scale: 175_000_000_000_000_000_000_000, // 175 ZB
    scaleLabel: '175 ZB',
    physical: '175 ocean lakes',
    annotation: '🚀 AI revolution',
  },
];

/**
 * Visual 5: Exponential Timeline
 * D3.js chart showing data scale growth from 1980-2025
 */
export default function Visual5_Timeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !isVisible) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 40, right: 60, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([1980, 2025])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleLog()
      .domain([1000, 200_000_000_000_000_000_000_000]) // 1 KB to 200 ZB
      .range([innerHeight, 0]);

    // Create main group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add axes
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => d.toString())
      .ticks(9);

    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((d) => {
        const num = d as number;
        if (num >= 1e21) return `${num / 1e21} ZB`;
        if (num >= 1e12) return `${num / 1e12} TB`;
        if (num >= 1e9) return `${num / 1e9} GB`;
        if (num >= 1e6) return `${num / 1e6} MB`;
        if (num >= 1e3) return `${num / 1e3} KB`;
        return num.toString();
      })
      .ticks(5);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#475569');

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .selectAll('text')
      .style('font-size', '12px')
      .style('fill', '#475569');

    // Add axis labels
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 45)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#334155')
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -55)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('fill', '#334155')
      .text('Data Scale (Bytes)');

    // Create line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(d.year))
      .y((d) => yScale(d.scale))
      .curve(d3.curveMonotoneX);

    // Add the line
    const path = g
      .append('path')
      .datum(TIMELINE_DATA)
      .attr('fill', 'none')
      .attr('stroke', '#0ea5e9')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate line drawing
    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

    // Add data points
    const points = g
      .selectAll('.data-point')
      .data(TIMELINE_DATA)
      .enter()
      .append('g')
      .attr('class', 'data-point')
      .attr('transform', (d) => `translate(${xScale(d.year)},${yScale(d.scale)})`);

    // Add circles with animation
    points
      .append('circle')
      .attr('r', 0)
      .attr('fill', '#0ea5e9')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .transition()
      .delay((d, i) => i * 400 + 500)
      .duration(300)
      .attr('r', 6);

    // Add annotation emojis
    points
      .append('text')
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('font-size', '20px')
      .style('opacity', 0)
      .text((d) => d.annotation)
      .transition()
      .delay((d, i) => i * 400 + 800)
      .duration(300)
      .style('opacity', 1);

  }, [isVisible]);

  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Exponential Growth: 1981–2025
        </h3>
        <p className="text-sm text-slate-600">
          From kilobytes to zettabytes in 44 years
        </p>
      </div>

      <svg
        ref={svgRef}
        className="flex-1 w-full"
        style={{ minHeight: '400px' }}
      />

      {hoveredPoint && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm">
            <span className="font-semibold">{hoveredPoint.year}</span>:{' '}
            {hoveredPoint.scaleLabel}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            {hoveredPoint.physical}
          </div>
        </div>
      )}
    </div>
  );
}
