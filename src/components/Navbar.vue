
<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #FFC0CB;">
      <div class="container-fluid">
      <a class="navbar-brand" href="#"><img src="../assets/bunny.jpg" height="30" alt=""> 建築研究所管理系統</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="BuildingMessage" class="nav-link"><b>新增案件資料</b></router-link>
          <router-link to="IntellgentBuilding" class="nav-link">新增續用、展期、更名案件資料</router-link>
          <router-link to="/IntellgentBuildingReceipt" class="nav-link">新增證書效期</router-link>
          <router-link to="/LabelTimeLimit" class="nav-link">新增收據統計</router-link>
        </div>
      </div>
    </div>
  </nav>
</template> 
<script>

export default {
    methods : {
        
        }
    }

</script>
