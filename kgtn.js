window.onload = function () {
  const dataTersimpan = JSON.parse(localStorage.getItem("daftarKegiatan")) || [];
  dataTersimpan.forEach(item => {
    buatItem(item.teks, item.hari, item.jam, item.selesai);
  });
};

function tambahKegiatan() {
  const teks = document.getElementById("inputKegiatan").value.trim();
  const hari = document.getElementById("inputHari").value.trim();
  const jam = document.getElementById("inputJam").value.trim();

  if (!teks || !hari || !jam) {
    alert("Silakan isi kegiatan, hari, dan jam.");
    return;
  }

  buatItem(teks, hari, jam, false);
  simpanKegiatan(teks, hari, jam, false);

  document.getElementById("inputKegiatan").value = "";
  document.getElementById("inputHari").value = "";
  document.getElementById("inputJam").value = "";
}

function buatItem(teks, hari, jam, selesai) {
  const daftar = document.getElementById("daftar-kegiatan");

  const item = document.createElement("li");

  const aksiDiv = document.createElement("div");
  aksiDiv.className = "aksi";

  const ceklis = document.createElement("input");
  ceklis.type = "checkbox";
  ceklis.checked = selesai;

  const span = document.createElement("span");
  span.textContent = teks;
  if (selesai) span.classList.add("selesai");

  ceklis.onchange = function () {
    span.classList.toggle("selesai");
    perbaruiStatus(teks, ceklis.checked);
  };

  const hapusBtn = document.createElement("button");
  hapusBtn.textContent = "Hapus";
  hapusBtn.onclick = function () {
    item.remove();
    hapusDariStorage(teks);
  };

  aksiDiv.appendChild(ceklis);
  aksiDiv.appendChild(span);
  aksiDiv.appendChild(hapusBtn);

  const waktu = document.createElement("div");
  waktu.className = "keterangan-waktu";
  waktu.textContent = `Hari: ${hari}, Jam: ${jam}`;

  item.appendChild(aksiDiv);
  item.appendChild(waktu);

  daftar.appendChild(item);
}

function simpanKegiatan(teks, hari, jam, selesai) {
  const data = JSON.parse(localStorage.getItem("daftarKegiatan")) || [];
  data.push({ teks, hari, jam, selesai });
  localStorage.setItem("daftarKegiatan", JSON.stringify(data));
}

function perbaruiStatus(teks, selesai) {
  const data = JSON.parse(localStorage.getItem("daftarKegiatan")) || [];
  const index = data.findIndex(item => item.teks === teks);
  if (index !== -1) {
    data[index].selesai = selesai;
    localStorage.setItem("daftarKegiatan", JSON.stringify(data));
  }
}

function hapusDariStorage(teks) {
  let data = JSON.parse(localStorage.getItem("daftarKegiatan")) || [];
  data = data.filter(item => item.teks !== teks);
  localStorage.setItem("daftarKegiatan", JSON.stringify(data));
}