import {Chart, ChartComponentLike} from "chart.js";

const getOrCreateLegendList = (chart: Chart, id: string) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer?.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.height = '100%';
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'column';
    listContainer.style.justifyContent = 'space-between';
    listContainer.style.margin = '0';
    listContainer.style.padding = '8px';
    listContainer.style.boxSizing = 'border-box';

    legendContainer?.appendChild(listContainer);
  }

  return listContainer;
};

export const htmlLegendPlugin: ChartComponentLike = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID as string);



    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    // @ts-ignore
    const items = chart.options.plugins.legend.labels.generateLabels(chart);
    items.forEach(item => {
      const li = document.createElement('li');
      li.classList.add('list-item')
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '0';

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          // @ts-ignore
          chart.toggleDataVisibility(item.index);
        } else {
          // @ts-ignore
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.classList.add('icon')
      boxSpan.style.background = item.strokeStyle as string;
      // boxSpan.style.borderColor = item.strokeStyle as string;
      boxSpan.style.width = '8px';
      boxSpan.style.height = '8px';
      boxSpan.style.borderRadius = '2px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.flexShrink = '0';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor as string;
      textContainer.style.margin = '0';
      textContainer.style.padding = '0';
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
      textContainer.style.whiteSpace = 'nowrap';
      textContainer.style.whiteSpace = '400';
      textContainer.style.fontSize = '12px';
      textContainer.style.lineHeight = '16px';
      textContainer.style.color = '#14181F';

      // font-weight: 400;
      // font-size: 12px;
      // line-height: 16px;
      // color: #14181F;

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};
