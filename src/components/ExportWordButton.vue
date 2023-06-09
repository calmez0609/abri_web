<template>
  <div>
    <button class="btn btn-secondary" @click="exportWord">導出 Word</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  methods: {
    exportData() {
      console.log('Exporting data:', this.buildingData);
      // 执行导出操作
    }
  },
  setup(props) {
    const exportWord = async () => {
      const videoParam = ref({
        data: [props.item]
      });

      console.log(props.item[0].ID);
      try {
        const content = await getFileContent("EX.docx");
        const zip = new PizZip(content);
        const doc = new docxtemplater().loadZip(zip);

        doc.setData({
          table: videoParam.value.data,
          certNumber : props.item[0].ID ,
          building_summary : props.item[0].building_summary,
          building_name : props.item[0].building_name,
          LEVEL : props.item[0].LEVEL,
          version : props.item[0].version,
          building_summary : props.item[0].building_summary,
          
        });

        doc.render();

        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        saveToFile(out, `${props.item[0].ID}_${props.item[0].building_name}.docx`);
      } catch (error) {
        console.error(error);
      }
    };

    const getFileContent = (url) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error(xhr.statusText));
          }
        };

        xhr.onerror = function () {
          reject(new Error('網路錯誤'));
        };

        xhr.send();
      });
    };

    const saveToFile = (data, filename) => {
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      saveAs(blob, filename);
    };

    return {
      exportWord
    };
  }
};
</script>
