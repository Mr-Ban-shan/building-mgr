<template>
  <div>
    <a-modal
      title="修改联系方式"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 12 } ">
        <a-form-item label="新的联系方式">
          <a-input  v-model:value="editForm.phone"/>
        </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>

<script src="./index.js"></script>
