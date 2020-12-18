$(function(){
  // 画像用のinputを生成する関数
  const buildFileField = (num)=> {
    const html = `<div data-index="${num}" class="js-file_group">
                    <input class="js-file" type="file" 
                    name="product[product_images_attributes][${num}][url]"
                    id="product_product_images_attributes_${num}_src"
                    data-index="${num}"><br>
                  </div>`;
    return html;
  }
  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
       const html = `<div class= "previewimg">
                      <img data-index="${index}" src="${url}" width="100px" height="100px">
                      <hr class="border-style">
                      <div class="js-remove">削除</div>
                     </div>`;
     return html;
  }
  
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  // 既に使われているindexを除外
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  //クリックされた時に発火させる 
  $("#images__upload").on("click", function(e){
    // js-fileの最後に追加
    let last_field = $(`.js-file`).last();
    // トリガーメソッドを使用して
    last_field.trigger("click");
  });
  
  // ファイルに変換させる
  $('#image-box').on('change', `input[type="file"]`, function(e) {
    const targetIndex = $(this).parent().data('index');


    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    // 該当indexを持つimgがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {  // 新規画像追加の処理
      $('.images__upload-box').before(buildImg(targetIndex, blobUrl));
      // fileIndexの先頭の数字を使ってinputを作る
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      // 末尾の数に1足した数を追加する
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      // 画像が１０枚投稿されたら.images__upload-boxを消す
      let num = $('.previewimg').length
      if (num == 10){
        $('.images__upload-box').css('display', 'none')
      }
    }
  });
  

  // クリック後targetIndexに取得した要素をいれる
  $(".upload-area").on('click', ".js-remove",function() {
    const targetIndex = $(this).prev().prev().data('index');
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
    // チェックボックスが存在すればチェックを入れる
    $(`#product_product_images_attributes_${targetIndex}__destroy`).prop('checked', true);
    // thisの親要素の削除
    $(this).parent().remove();
    // imgのdata-indexの削除
    $(`img[data-index="${targetIndex}"]`).remove();
    // js-fileにdata-indexを削除
    $(`.js-file[data-index="${targetIndex}"]`).remove();
    // 画像削除、もしチェックボックスにチェックが入っている場合チェックをなくす
    if ($(`#product_product_images_attributes_${targetIndex}__destroy`)) {
      const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);
      hiddenCheck.prop('checked', false);
    }
    // 新規画像追加の処理
    $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();

    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});