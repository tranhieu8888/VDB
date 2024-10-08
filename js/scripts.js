document.addEventListener("DOMContentLoaded", function () {
  loadContent("component/navbar.html", "top-navbar")
      .then(() => loadContent("component/sidebar-left.html", "sidebar-left"))
      .then(() => loadContent("component/sidebar-right.html", "sidebar-right"))
      .then(() => {
          const trangCanhanLink = document.getElementById("trangcanhan");
          const subTrangCanhan = document.getElementById("sub-trangcanhan");
          trangCanhanLink.addEventListener("click", function (event) {
              event.preventDefault();
              subTrangCanhan.classList.toggle("show");
          });

          document.querySelectorAll(".text-mmenu-left").forEach((item) => {
              item.addEventListener("click", function () {
                  // Loại bỏ class 'active' khỏi tất cả các div
                  document.querySelectorAll(".text-mmenu-left").forEach((box) => box.classList.remove("active"));

                  // Thêm class 'active' cho thẻ div được click
                  this.classList.add("active");
              });
          });

          document.querySelectorAll(".textSub-menu").forEach((item) => {
              item.addEventListener("click", function () {
                  // Loại bỏ class 'active' khỏi tất cả các div
                  document.querySelectorAll(".textSub-menu").forEach((box) => box.classList.remove("active"));

                  // Thêm class 'active' cho thẻ div được click
                  this.classList.add("active");
              });
          });

          const scMenu = document.getElementById("sc-menu");
          const sidebarLeft = document.getElementById("sidebar-left");

          scMenu.addEventListener("click", function (event2) {
              if (sidebarLeft.style.display != "none") {
                  sidebarLeft.style.setProperty("display", "none", "important");
              } else {
                  sidebarLeft.style.setProperty("display", "block", "important");
              }
          });

          // add class active child-icon-navbar
          const child_icon_navbar = document.querySelectorAll(".child-icon-navbar");
          child_icon_navbar.forEach(function (div) {
              div.addEventListener("click", function () {
                  // Xóa lớp 'active' khỏi tất cả các div
                  child_icon_navbar.forEach(function (item) {
                      item.classList.remove("active");
                  });
                  // Thêm lớp 'active' vào div được click
                  div.classList.add("active");
              });
          });
      })
      .catch((error) => {
          console.error("Error loading content:", error);
      });
});

function loadContent(file, elementId) {
  return fetch(file)
      .then((response) => response.text())
      .then((data) => {
          document.getElementById(elementId).innerHTML = data;
      });
}

// Show Dropdown
const moreTopic = document.getElementById("more-topic");
const mainDropdown = document.getElementById("mainDropdown");

if (moreTopic) {
  moreTopic.addEventListener("click", function () {
      // Lấy giá trị hiện tại của display từ CSS
      const computedStyle = window.getComputedStyle(mainDropdown);
      const displayStyle = computedStyle.getPropertyValue("display");

      // Kiểm tra và thay đổi trạng thái của mainDropdown
      if (displayStyle === "none") {
          mainDropdown.style.display = "block"; // Nếu ẩn, hiển thị lên
      } else {
          mainDropdown.style.display = "none"; // Nếu hiển thị, ẩn đi
      }
  });
}

// add class active tag-history
document.addEventListener("DOMContentLoaded", function () {
  const divs = document.querySelectorAll(".tag-history");

  divs.forEach(function (div) {
      div.addEventListener("click", function () {
          // Xóa lớp 'active' khỏi tất cả các div
          divs.forEach(function (item) {
              item.classList.remove("active");
          });

          // Thêm lớp 'active' vào div được click
          div.classList.add("active");
      });
  });
});
const btnChevon = document.getElementById("btn-chevon");
const menuLeftBody = document.getElementById("menu-left-body");
const mid_menu_body_topic = document.getElementById("mid-menu-body-topic");
const mid_menu_body = document.querySelector(".mid-menu-body");

const btn_chevon_right = document.getElementById("btn-chevon-right");
if (btnChevon) {
  btnChevon.addEventListener("click", function () {
      // Kiểm tra xem menu có lớp 'menu-hidden' hay không
      if (menuLeftBody.classList.contains("menu-hidden")) {
          menuLeftBody.classList.remove("menu-hidden"); // Nếu có thì xóa lớp để hiển thị menu
      } else {
          menuLeftBody.classList.add("menu-hidden"); // Nếu không có thì thêm lớp để ẩn menu
          // mid_menu_body_topic.style.width = '100%';
          mid_menu_body.style.setProperty("width", "100%", "important");

          btn_chevon_right.style.setProperty("display", "block", "important");
      }
  });
}

if (btn_chevon_right) {
  btn_chevon_right.addEventListener("click", function () {
      menuLeftBody.classList.remove("menu-hidden"); // Nếu có thì xóa lớp để hiển thị menu
      mid_menu_body.style.setProperty("width", "716px", "important");
      btn_chevon_right.style.setProperty("display", "none", "important");
  });
}

// upload 5 image in
function uploadImage(index) {
  const fileInput = document.querySelectorAll(".file-input")[index];
  fileInput.click();
}

function previewImage(event, index) {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const box = document.querySelectorAll(".box")[index];
          const icon = box.querySelector(".icon");
          icon.style.display = "none";
          const uploadedImg = document.createElement("img");
          uploadedImg.src = e.target.result;
          uploadedImg.classList.add("uploaded-img");
          box.appendChild(uploadedImg);
      };
      reader.readAsDataURL(file);
  }
}

//upload image contribute drag
const uploadContainer = document.getElementById("upload-container");

if (uploadContainer) {
  const fileInput = document.getElementById("file-upload");
  const fileNameDisplay = document.getElementById("file-name");
  const errorMessageDisplay = document.getElementById("error-message");
  const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

  uploadContainer.addEventListener("click", () => {
      fileInput.click();
  });

  uploadContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadContainer.classList.add("dragover");
  });

  uploadContainer.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadContainer.classList.remove("dragover");
  });

  uploadContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadContainer.classList.remove("dragover");
      const files = e.dataTransfer.files;
      if (files.length) {
          fileInput.files = files;
          displayFileName(files[0]);
      }
  });

  fileInput.addEventListener("change", (e) => {
      if (fileInput.files.length) {
          displayFileName(fileInput.files[0]);
      }
  });

  function displayFileName(file) {
      fileNameDisplay.textContent = `Tên file: ${file.name}`;
  }

  function handleFileUpload(file) {
      if (file.size > MAX_FILE_SIZE) {
          errorMessageDisplay.textContent = `File vượt quá dung lượng cho phép 200MB.`;
          fileNameDisplay.textContent = "";
          fileInput.value = ""; // Clear the file input
      } else {
          errorMessageDisplay.textContent = "";
          fileNameDisplay.textContent = `Tên file: ${file.name}`;
      }
  }
}

document.getElementById("close-contributes").addEventListener("click", function () {
  console.log("abc");
  document.querySelector(".contribute").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
});

document.getElementById("close-manager-contribute").addEventListener("click", function () {
  document.querySelector(".manager-contribute").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.body.classList.remove("no-scroll");
});

document.addEventListener("DOMContentLoaded", function () {
  // Lắng nghe sự kiện click vào phần tử có ID là 'button-gr-body-mid-contribute'
  document.getElementById("button-gr-body-mid-contribute").addEventListener("click", function () {
      // Hiển thị phần tử có lớp là 'contribute'
      document.querySelector(".contribute").style.setProperty("display", "flex", "important");

      // Đặt màu nền của body
      document.getElementById("overlay").style.display = "block";

      // Thêm lớp 'no-scroll' vào body để ngăn cuộn trang
      document.body.classList.add("no-scroll");
  });

  document.getElementById("button-gr-body-mid-mngcontribute").addEventListener("click", function () {
      // Hiển thị phần tử có lớp là 'contribute'
      document.querySelector(".manager-contribute").style.setProperty("display", "flex", "important");

      // Đặt màu nền của body
      document.getElementById("overlay").style.display = "block";

      // Thêm lớp 'no-scroll' vào body để ngăn cuộn trang
      document.body.classList.add("no-scroll");
  });

  document.getElementById("button-gr-body-mid-setting").addEventListener("click", function () {
      // Hiển thị phần tử có lớp là 'contribute'
      // document.querySelector('.menu-setting').style.setProperty('display', 'flex', 'important');

      const menuSetting = document.querySelector(".menu-setting");

      if (menuSetting.classList.contains("flex-display")) {
          menuSetting.classList.remove("flex-display");
      } else {
          menuSetting.classList.add("flex-display");
      }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-mn");

  tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
          tabs.forEach((t) => t.classList.remove("tab-active"));
          this.classList.add("tab-active");
      });
  });
});

const managerContribute = document.querySelector(".manager-contribute");

if (managerContribute) {
  //phantrang
  let currentPage = 1;
  let itemsPerPage = 10;
  let totalItems = 0;
  let totalPages = 0;

  function updateItemsPerPage() {
      itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);
      updateTotalItems();
      renderPagination();
      renderContent();
  }

  function updateTotalItems() {
      // Get the total number of rows in the table
      totalItems = document.querySelectorAll("#dataTable tbody tr").length;
      totalPages = Math.ceil(totalItems / itemsPerPage);

      // Update the UI elements
      document.getElementById("count-item-perpage").textContent = `${itemsPerPage}`;
      document.getElementById("sumcountItem").textContent = `${totalItems}`;
  }

  function renderPagination() {
      const pageNumbers = document.getElementById("pageNumbers");
      pageNumbers.innerHTML = "";

      if (totalPages <= 10) {
          // Display all page numbers if there are 10 or fewer pages
          for (let i = 1; i <= totalPages; i++) {
              if (i === currentPage) {
                  pageNumbers.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
              } else {
                  pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${i})">${i}</button></li>`;
              }
          }
      } else {
          // Display page numbers with ellipses
          if (currentPage <= 5) {
              // Start pages
              for (let i = 1; i <= 5; i++) {
                  if (i === currentPage) {
                      pageNumbers.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
                  } else {
                      pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${i})">${i}</button></li>`;
                  }
              }
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="showGotoPageModal()">...</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${totalPages - 1})">${totalPages - 1}</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${totalPages})">${totalPages}</button></li>`;
          } else if (currentPage > totalPages - 5) {
              // End pages
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(1)">1</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(2)">2</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="showGotoPageModal()">...</button></li>`;
              for (let i = totalPages - 5; i <= totalPages; i++) {
                  if (i === currentPage) {
                      pageNumbers.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
                  } else {
                      pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${i})">${i}</button></li>`;
                  }
              }
          } else {
              // Middle pages
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(1)">1</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(2)">2</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="showGotoPageModal()">...</button></li>`;
              for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                  if (i === currentPage) {
                      pageNumbers.innerHTML += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
                  } else {
                      pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${i})">${i}</button></li>`;
                  }
              }
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="showGotoPageModal()">...</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${totalPages - 1})">${totalPages - 1}</button></li>`;
              pageNumbers.innerHTML += `<li class="page-item"><button class="page-link" onclick="goToPage(${totalPages})">${totalPages}</button></li>`;
          }
      }

      document.getElementById("prev").disabled = currentPage === 1;
      document.getElementById("next").disabled = currentPage === totalPages;
  }

  function renderContent() {
      const rows = document.querySelectorAll("#dataTable tbody tr");
      rows.forEach((row, index) => {
          row.style.display = index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage ? "" : "none";
      });
  }

  function goToPage(page) {
      currentPage = page;
      renderPagination();
      renderContent();
  }

  function prevPage() {
      if (currentPage > 1) {
          goToPage(currentPage - 1);
      }
  }

  function nextPage() {
      if (currentPage < totalPages) {
          goToPage(currentPage + 1);
      }
  }

  function showGotoPageModal() {
      document.getElementById("gotoPageModal").style.display = "block";
  }

  function closeGotoPageModal() {
      document.getElementById("gotoPageModal").style.display = "none";
  }

  function goToPageNumber() {
      const pageNumber = parseInt(document.getElementById("gotoPage").value);
      if (pageNumber >= 1 && pageNumber <= totalPages) {
          goToPage(pageNumber);
          closeGotoPageModal();
      } else {
          alert(`Please enter a valid page number between 1 and ${totalPages}`);
      }
  }

  // Initial render
  updateItemsPerPage();
}

//AI Typping
function sendText() {
  const text = document.getElementById("text-box-midBody").value.trim();
  if (text) {
      const messagesDiv = document.getElementById("messages");

      // Thêm tin nhắn của người dùng
      const userMessage = createMessageContainer("user", "icon/Profile.svg", "Bạn", text);
      messagesDiv.appendChild(userMessage);
      document.getElementById("text-box-midBody").value = ""; // Xóa nội dung textarea

      // Tự động cuộn xuống để hiển thị tin nhắn mới
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // Giả lập phản hồi từ AI với hiệu ứng in ra từ từ và thêm hình ảnh hoặc video nếu có
      setTimeout(() => {
          const aiResponse = {
              text: "Đây là phản hồi từ AI. Nó sẽ xuất hiện từng ký tự một.",
              media: {
                  type: "image", // 'image' hoặc 'video'
                  src: "icon/image 1820.svg", // Đường dẫn đến ảnh hoặc video
              },
          };
          const aiMessage = createMessageContainer("ai", "icon/image 1.svg", "VDB AI", "");
          messagesDiv.appendChild(aiMessage);
          typeEffect(aiMessage.querySelector(".message-content"), aiResponse.text, () => {
              if (aiResponse.media) {
                  addMedia(aiMessage.querySelector(".message-content"), aiResponse.media);
              }
          });

          // Thêm phần tử cảm xúc vào tin nhắn AI
          const feelingContainer = document.createElement("div");
          feelingContainer.className = "feeling-container";
          feelingContainer.innerHTML = `
            <div class="d-flex" style="gap: 8px;">
                <img id="feeling-icon" src="icon/ant-design_heart-outlined.svg" width="16" height="16" />
                <img id="feeling-icon" src="icon/solar_medal-ribbon-star-linear.svg" width="16" height="16" />
                <img id="feeling-icon" src="icon/iconamoon_comment.svg" width="16" height="16" />
                <img id="feeling-icon" src="icon/mingcute_share-forward-line.svg" width="16" height="16" />
            </div>
        `;
          aiMessage.appendChild(feelingContainer);

          // Tự động cuộn xuống để hiển thị tin nhắn mới
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
      }, 1000); // Thay đổi thời gian để phản hồi AI xuất hiện
  }
}

function createMessageContainer(type, avatarSrc, name, messageText) {
  const container = document.createElement("div");
  container.className = `message ${type}-message`;

  const headerContainer = document.createElement("div");
  headerContainer.className = "message-header-container";

  const avatar = document.createElement("img");
  avatar.src = avatarSrc;
  avatar.width = 24;
  avatar.height = 24;
  avatar.alt = `${name} Avatar`;

  const header = document.createElement("span");
  header.className = "message-header";
  header.textContent = name;

  headerContainer.appendChild(avatar);
  headerContainer.appendChild(header);

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = messageText;

  container.appendChild(headerContainer);
  container.appendChild(content);

  return container;
}

function typeEffect(element, text, callback, speed = 5) {
  let index = 0;
  element.textContent = "";

  function type() {
      if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, speed);
      } else if (callback) {
          callback();
      }
  }

  type();
}

function addMedia(container, media) {
  let mediaElement;
  if (media.type === "image") {
      mediaElement = document.createElement("a");
      mediaElement.href = media.src;
      mediaElement.dataset.fancybox = "gallery";
      mediaElement.className = "image-link";

      const img = document.createElement("img");
      img.src = media.src;
      img.width = 300;
      img.height = 225;

      mediaElement.appendChild(img);
  } else if (media.type === "video") {
      mediaElement = document.createElement("a");
      mediaElement.href = media.src;
      mediaElement.dataset.fancybox = "gallery";

      const video = document.createElement("video");
      video.width = 300;
      video.height = 225;
      video.controls = true;

      const source = document.createElement("source");
      source.src = media.src;
      source.type = "video/mp4";

      video.appendChild(source);
      mediaElement.appendChild(video);
  }

  if (mediaElement) {
      container.appendChild(mediaElement);
  }
}

$(document).ready(function () {
  $('[data-fancybox="gallery"]').fancybox({
      // Các tùy chọn Fancybox có thể được cấu hình tại đây
      buttons: ["slideShow", "thumbs", "close"],
  });
});
