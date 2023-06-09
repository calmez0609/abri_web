<template>
  <div class="container-fluid">
    搜尋: <input type="text" v-model="searchValue">
    <div class="text-end">
      <button type="button" class="btn btn-primary" @click.prevent="openModal(true, tempDataInfo)">增加一個新的資料</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">ID</th>
          <th width="120">建築物名稱</th>
          <th width="120">單位</th>
          <th width="120">起造人</th>
          <th width="100">建築概要</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in displayedItems" :key="item.ID">
          <td>{{ item.ID }}</td>
          <td>{{ item.building_name }}</td>
          <td>{{ item.applicane }}</td>
          <td>{{ item.designer }}</td>
          <td>{{ item.building_summary }}</td>
          <td>
            <div class="btn-group">
              <ExportWordButton @click="getAllData(item)" :item="building_AllData" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update-page="updatePage"
    />
    <BuildingMessageModal
      ref="buildingMessageModal"
      :datainfo="tempDataInfo"
      @update-data-info="updateDataInfo"
    >
    </BuildingMessageModal>
  </div>
</template>

<script>
import BuildingMessageModal from '@/components/BuildingMessageModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/Pagination.vue';
import ExportWordButton from '@/components/ExportWordButton.vue';

export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 0,
      pageSize: 20,
      building_data: [],
      table: '',
      pagination: {},
      tempDataInfo: {},
      isNew: false,
      isLoading: false,
      isCIB : false,
      building_AllData : []
    };
  },
  components: {
    ExportWordButton,
    BuildingMessageModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'],
  computed: {
    displayedItems() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      console.log(this.building_data.slice(start, end))
      return this.building_data.slice(start, end);
    }
  },
  methods: {
    searchData() {
    // 根据搜索值进行筛选
      const filteredData = this.building_data.filter(item => {
        // 在这里根据需要定义搜索逻辑
        return item.building_name.toLowerCase().includes(this.searchValue.toLowerCase());
      });
      // 更新总页数
      this.totalPages = Math.ceil(filteredData.length / this.pageSize);

      // 根据当前页码和每页大小显示相应的数据
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayedItems = filteredData.slice(start, end);
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempDataInfo = {};
      } else {
        this.tempDataInfo = { ...item };
      }
      this.isNew = isNew;
      const buildingMessageComponent = this.$refs.buildingMessageModal;
      buildingMessageComponent.showModal();
    },
    getData() {
      const url = `${process.env.VUE_APP_API}/user`;
      const params = {
        table: this.table,
      };

      this.$http
        .get(url, { params })
        .then(res => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.building_data = res.data;
            this.totalPages = Math.ceil(res.data.length / this.pageSize);
          } else {
            console.error('Invalid data structure:', res.data);
          }
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    },
    updatePage(page) {
      this.currentPage = page;
    },
    updateDataInfo(item) {
      this.tempDataInfo = item;

      let url = `${process.env.VUE_APP_API}/list/insert_buildingMessage`;
      const params = { ...item };

      this.$http
        .get(url, { params })
        .then(res => {
          console.log('success');
        })
        .catch(error => {
          console.error('Failed to insert buildingMessage:', error);
        });

      if (item.certNumber.includes('CIB')) {
        url = `${process.env.VUE_APP_API}/list/insert_candidateMessage`;
      } else {
        url = `${process.env.VUE_APP_API}/list/insert_labelMessage`;
      }

      this.$http
        .get(url, { params })
        .then(res => {
          console.log('success get candidate_message/label_message');
        })
        .catch(error => {
          console.error('Failed to insert candidate_message/label_message:', error);
        });
    },
    getAllData(item){
      const params = {
        isCIB : this.isCIB.toString,
        ID : item.ID
      };
      if(item.ID.includes('CIB')){
        this.isCIB = true
      } else {
        this.isCIB = false 
      }
      const url = `${process.env.VUE_APP_API}/list/getAllData`;
      this.$http
        .get(url, { params })
        .then(res => {
          console.log(res)
          if (Array.isArray(res.data) && res.data.length > 0) {
            this.building_AllData = res.data;
          } else {
            console.error('Invalid data structure:', res.data);
          }
        })
        .catch(error => {
          console.error('Failed to fetch data:', error);
        });
    }
  },
  watch: {
    searchValue: {
      handler(newVal) {
        this.currentPage = 1; // 重置当前页码为第一页
        this.searchData();
      },
      immediate: false
      }
  },
  created() {
    this.table = 'building_message';
    this.getData();
  }
};
</script>
