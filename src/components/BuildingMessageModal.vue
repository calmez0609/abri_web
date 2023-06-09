<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增文件資訊</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row gx-3">
            <div class="mb-3 col-md-6">
              <label for="certNumber" class="form-label">證書編號(必填)</label>
              <input type="text" class="form-control" id="certNumber" placeholder="請輸入證書編號" v-model="tempDataInfo.certNumber" @blur="checkDuplicateCertNumber" />
              <br>
              <span id="error" v-if="errors.certNumber" class="error">{{ errors.certNumber }}</span>
            </div>
            <div class="mb-3 col-md-6">
              <label for="assessmentNumber" class="form-label">評定書編號</label>
              <input type="text" class="form-control" id="assessmentNumber" placeholder="請輸入評定書編號"
                v-model="tempDataInfo.assessmentNumber">
            </div>
          </div>
          <div class="row gx-3">
            <div class="mb-3 col-md-6">
              <label for="buildingName" class="form-label">建築物名稱</label>
              <input type="text" class="form-control" id="buildingName" placeholder="請輸入建築物名稱"
                v-model="tempDataInfo.buildingName">
            </div>
            <div class="mb-3 col-md-6">
              <label for="builder" class="form-label">起造人</label>
              <input type="text" class="form-control" id="builder" placeholder="請輸入起造人" v-model="tempDataInfo.owner">
            </div>
          </div>
          <div class="row gx-3">
            <div class="mb-3 col-md-4">
              <label for="ownerAddress" class="form-label">起造人地址</label>
              <input type="text" class="form-control" id="ownerAddress" placeholder="請輸入起造人地址"
                v-model="tempDataInfo.ownerAddress">
            </div>
            <div class="mb-3 col-md-4">
              <label for="designer" class="form-label">建築物設計人</label>
              <input type="text" class="form-control" id="designer" placeholder="請輸入建築物設計人"
                v-model="tempDataInfo.designer">
            </div>
            <div class="mb-3 col-md-4">
              <label for="publicOrPrivate" class="form-label">公有 / 民間</label>        
              <select type="text" class="form-control" :value=value id="publicOrPrivate" placeholder="請選擇公有 / 民間"
                v-model="tempDataInfo.publicOrPrivate">
                <option value="0" >公有</option>
                <option value="1">民間</option>
              </select>
            </div>
          </div>
          <div class="row gx-3">
            <div class="mb-3 col-md-4">
              <label for="usageType" class="form-label">用途別</label>
              <input type="text" class="form-control" id="usageType" placeholder="請輸入用途別"
                v-model="tempDataInfo.usageType">
            </div>
            <div class="mb-3 col-md-4">
              <label for="applicableStandard" class="form-label">適用基準</label>
              <input type="text" class="form-control" id="applicableStandard" placeholder="請輸入適用基準"
                v-model="tempDataInfo.applicableStandard">
            </div>
            <div class="mb-3 col-md-4">
              <label for="level" class="form-label">等級</label>
              <input type="number" min="0" max="4" class="form-control" id="level" placeholder="請輸入等級" v-model="tempDataInfo.level">
            </div>
          </div>
            <div class="row gx-3">
              <div class="mb-3 col-md-4">
                <label for="passCriteria" class="form-label">通過指標</label>
                <input type="text"  class="form-control" id="passCriteria" placeholder="請輸入通過指標"
                  v-model="tempDataInfo.passCriteria">
              </div>
              <div class="mb-3 col-md-4">
                <label for="indicatorCount" class="form-label">指標數</label>
                <input type="text" class="form-control" id="indicatorCount" placeholder="請輸入指標數"
                  v-model="tempDataInfo.indicatorCount">
              </div>
              <div class="mb-3 col-md-4">
                <label for="location" class="form-label">建築地點</label>
                <input type="text" class="form-control" id="location" placeholder="請輸入建築地點"
                  v-model="tempDataInfo.location">
              </div>
            </div>
            <div class="row gx-3">
              <div class="mb-3 col-md-4">
                <label for="totalFloorArea" class="form-label">總樓地板面積 (m2)</label>
                <input type="text" class="form-control" id="totalFloorArea" placeholder="請輸入總樓地板面積"
                  v-model="tempDataInfo.totalFloorArea">
              </div>
              <div class="mb-3 col-md-4">
                <label for="constructionCost" class="form-label">工程造價 (億元)</label>
                <input type="text" class="form-control" id="constructionCost" placeholder="請輸入工程造價"
                  v-model="tempDataInfo.constructionCost">
              </div>
              <div class="mb-3 col-md-4">
                <label for="buildingSummary" class="form-label">建築物概要</label>
                <input type="text" class="form-control" id="buildingSummary" placeholder="請輸入建築物概要"
                  v-model="tempDataInfo.buildingSummary">
              </div>
            </div>
            <div class="row gx-3">
              <div class="mb-1 col-md-4">
                <label for="unitCount" class="form-label">戶數</label>
                <input type="text" class="form-control" id="unitCount" placeholder="請輸入戶數"
                  v-model="tempDataInfo.unitCount">
              </div>
              <div class="mb-1 col-md-4">
                <label for="projectType" class="form-label">工程類別</label>
                <input type="text" class="form-control" id="projectType" placeholder="請輸入工程類別"
                  v-model="tempDataInfo.projectType">
              </div>
              <div class="mb-1 col-md-4">
                <label for="contractor" class="form-label">承辦人</label>
                <input type="text" class="form-control" id="contractor" placeholder="請輸入承辦人"
                  v-model="tempDataInfo.contractor">
              </div>
            </div>
            <div class="row gx-3">
              <div class="mb-1 col-md-4">
                <label for="regulatoryRequirements" class="form-label">受法規要求</label>
                <input type="text" class="form-control" id="regulatoryRequirements" placeholder="請輸入受法規要求"
                  v-model="tempDataInfo.regulatoryRequirements">
              </div>
              <div class="mb-1 col-md-4">
                <label for="bonusName" class="form-label">容積獎勵名稱</label>
                <input type="text" class="form-control" id="bonusName" placeholder="請輸入容積獎勵名稱"
                  v-model="tempDataInfo.bonusName">
              </div>
              <div class="mb-1 col-md-4">
                <label for="bonusVolume" class="form-label">容積獎勵</label>
                <input type="text" class="form-control" id="bonusVolume" placeholder="請輸入容積獎勵"
                  v-model="tempDataInfo.bonusVolume">
              </div>
            </div>
            <div class="row gx-3">
              <div class="mb-1 col-md-4" v-if=isCIB>
                <label for="candidateCertNumber" class="form-label">候選證書編號</label>
                <input type="text" class="form-control" id="candidateCertNumber" placeholder="請輸入候選證書編號"
                  v-model="tempDataInfo.candidateCertNumber">
              </div>
              <div class="mb-1 col-md-4">
                <label for="administrativeDistrict" class="form-label">所屬行政區</label>
                <input type="text" class="form-control" id="administrativeDistrict" placeholder="請輸入所屬行政區"
                  v-model="tempDataInfo.administrativeDistrict">
              </div>
              <div class="mb-1 col-md-4">
                <label for="plateNumber" class="form-label">門牌</label>
                <input type="text" class="form-control" id="plateNumber" placeholder="請輸入門牌"
                  v-model="tempDataInfo.plateNumber">
              </div>
            </div>
            <hr>
            <div class="mb-3">
              <div class="form-check">
                <span v-if="errors.certNumber" class="error">{{ errors.certNumber }}</span>
              </div>
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-primary" :disabled="!canCreated" @click="delay">確認
              </button>
            </div>
          </div>
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
      </button>

    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { required } from 'vee-validate';

export default {
  mixins: [modalMixin],
  props: {
    datainfo: {
      type: Object,
      default() { return {}; }
    }
  },
  watch: {
    datainfo() {
      console.log('trigger')
      if (!this.datainfo){
        this.tempDataInfo = this.datainfo
        console.log(this.datainfo)
      }
      console.log(this.tempDataInfo.publicOrPrivate)
    },
    'tempDataInfo.publicOrPrivate': function(newVal, oldVal) {
      console.log(this.tempDataInfo)
    // 在這裡可以執行相關的處理邏輯
    },
    'tempDataInfo.certNumber': function(newVal, oldVal) {
      if(this.tempDataInfo.certNumber.includes('CIB')){
        this.isCIB = true
      } else {
        this.isCIB = false
      }
      console.log(this.tempDataInfo)
      this.validateCertNumber();
    }
  },
  data() {
    return {
      disabled: false,
      timeout: null,
      modal: {},
      tempDataInfo: {certNumber:""},
      errors: {},
      canCreated : false,
      isCIB : false
    };
  },

  methods: {
    async checkDuplicateCertNumber(certNumber) {
      try {
        const response = await this.$http.get(`${process.env.VUE_APP_API}/list/checkDuplicateCertNumber`, { params: { certNumber } });
        console.log("correct")
        return response.data;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async delay() {
      this.disabled = true;
      // Re-enable after 5 seconds
      this.timeout = setTimeout(() => {
        this.disabled = false;
      }, 5000);
      await this.myFunction();
    },
    async myFunction() {
      console.log(this.tempDataInfo);
      const isValid = await this.validateCertNumber();
      if (isValid) {
        this.$emit('update-data-info', this.tempDataInfo);
      }
    },
    async validateCertNumber() {
      const certNumber = this.tempDataInfo.certNumber;
      if (!certNumber) {
        this.errors.certNumber = '請輸入證書編號';
        return false;
      }

      const isDuplicate =await this.checkDuplicateCertNumber(certNumber);
      const isValid = this.tempDataInfo.certNumber.includes('CIB') ||  this.tempDataInfo.certNumber.includes('IB') 
      if (isDuplicate) {
        this.errors.certNumber = '證書編號已存在';
        this.canCreated = false
        return false;
      } else {
        if(!isValid){
          this.errors.certNumber = '證書編號不合規定';
          this.canCreated = false
          return false;
        }
        this.errors.certNumber = '可以使用這個編號';
        this.canCreated = true
        return true;
      }

      delete this.errors.certNumber;
      return true;
    },
    initDefaultValue() {
      
      this.tempDataInfo = {
        certNumber: '101CIB999',
        assessmentNumber: '001',
        buildingName: '建築研究所',
        publicOrPrivate: 0,
        usageType: '辦公大樓',
        yearOfCompletion: '109',
        totalFloorArea: 1256.35,
        certificationLevel: 'P',
        energySaving: '111',
        greenBuilding: '222',
        waterSaving: '333',
        indoorEnvironmentalQuality: '444',
        resourceRecycling: '555',
        mainFormOfEnergyUse: '666',
        constructionCost: '1.64',
        certificationDate: '2021-06-03',
        owner: '建築研究所',
        designer: '宏輔',
        location: '建築研究所',
        constructionType: '鋼筋混凝土',
        structuralSystem: '鋼構',
        regulatoryRequirements: '是',
        bonusName: '獎勵',
        bonusVolume: '100',
        filePath: '',
        originalFilePath: '',
        summary: '',
        unitCount: 5,
        buildingSummary: '地上13層',
        projectType: '預鑄',
        contractor: '宏輔',
      };
    },
  },

  created() {
    this.initDefaultValue();
  },
};
</script>