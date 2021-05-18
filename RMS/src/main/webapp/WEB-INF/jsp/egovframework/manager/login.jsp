<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<style type="text/css">
button {
  height: 2.5em;
  cursor: pointer;
}

#popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  z-index: 1;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

#popup.hide {
  display: none;
}

#popup.multiple-filter {
  backdrop-filter: blur(4px) grayscale(90%);
  -webkit-backdrop-filter: blur(4px) grayscale(90%);
}

#popup .content {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, .3);
}
</style>

<script type="text/javascript">
function showPopup(hasFilter) {
	const popup = document.querySelector('#popup');
  
  if (hasFilter) {
  	popup.classList.add('has-filter');
  } else {
  	popup.classList.remove('has-filter');
  }
  
  popup.classList.remove('hide');
}

function closePopup() {
	const popup = document.querySelector('#popup');
  popup.classList.add('hide');
}
</script>
</head>
<body>
<button onclick="showPopup()">blur 적용한 팝업창 보기</button>
<button onclick="showPopup(true)">필터 중복 적용한 팝업창 보기</button>
<p><a href="https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Wildpark_--_2018_--_1458-62.jpg#/media/File:Dülmen,_Wildpark_--_2018_--_1458-62.jpg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/D%C3%BClmen%2C_Wildpark_--_2018_--_1458-62.jpg/1200px-D%C3%BClmen%2C_Wildpark_--_2018_--_1458-62.jpg" alt="Dülmen, Wildpark -- 2018 -- 1458-62.jpg"></a><br>By <a href="//commons.wikimedia.org/wiki/User:XRay" title="User:XRay">Dietmar Rabich</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=73536179">Link</a></p>
<h2>
What is Lorem Ipsum?
</h2>
<p>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
</p>
<h2>
Where does it come from?
</h2>
<p>
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
</p>
<p>
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
</p>
<div id="popup" class="hide">
  <div class="content">
    <p>
      여기에 팝업창 내용이 나타납니다.
    </p>
    <button onclick="closePopup()">닫기</button>
  </div>
</div>
</body>
</html>