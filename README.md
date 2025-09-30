# ToeflRecord — Proyek Hardhat (`mocha` + `ethers`)

Repositori untuk kontrak Solidity `ToeflRecord` yang menyimpan data hasil tes TOEFL di blockchain dan menyediakan antarmuka baca.

Lihat dokumentasi Hardhat untuk panduan umum: [Panduan Memulai Hardhat](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3)

## Gambaran proyek

Isi repositori ini:

- `contracts/ToeflRecord.sol` — kontrak Solidity untuk menyimpan data TOEFL yang diindeks dengan hash `bytes32`.
- Unit test Solidity (foundry) dan hasil kompilasi di `artifacts/`.
- Tes integrasi TypeScript menggunakan `mocha` dan `ethers` di `test/`.

## Ringkasan kontrak

Kontrak: `ToeflRecord`

- Struktur `Record` berisi:

- `address address_peserta` — alamat peserta (Metamask)
- `string nama_lengkap` — nama lengkap peserta
- `string email` — email peserta
- `string nomor_induk_mahasiswa` — NIM atau ID mahasiswa
- `string jurusan` — jurusan
- `string sesi_tes` — sesi tes (mis. "Pagi")
- `uint8 tanggal_tes` — tanggal tes (angka)
- `uint8 nilai_listening` — skor listening
- `uint8 nilai_structure` — skor structure
- `uint8 nilai_reading` — skor reading
- `uint8 tanggal_terbit` — tanggal terbit sertifikat (angka)
- `address address_admin` — alamat admin yang menerbitkan record

Penyimpanan: `mapping(bytes32 => Record) private records` — menyimpan `Record` berdasarkan `toefl_hash`.

Event: `RecordStored(bytes32 indexed toefl_hash, address indexed address_peserta)` — dipancarkan saat record baru disimpan.

Fungsi utama:

- `storedRecord(bytes32 toefl_hash, Record calldata _record)` — menyimpan record baru; akan revert jika `toefl_hash` sudah ada.
- `getRecord(bytes32 toefl_hash)` — fungsi view yang mengembalikan `Record`; akan revert jika record tidak ditemukan.

## Menjalankan tes

Jalankan semua tes (Solidity + mocha):

```shell
npx hardhat test
```

Jalankan hanya test TypeScript / mocha:

```shell
npx hardhat test mocha
```

Jalankan hanya test Solidity:

```shell
npx hardhat test solidity
```

## Contoh penggunaan (ethers)

Contoh singkat yang serupa dengan `test/ToeflRecord.test.ts`:

- Hitung hash sebagai kunci untuk menyimpan record:

```js
const toeflHash = ethers.keccak256(ethers.toUtf8Bytes("tes123"));
```

- Siapkan objek `record` yang sesuai dengan struct dan panggil `storedRecord`:

```js
const record = {
  address_peserta: peserta.address,
  nama_lengkap: "Muh. Fadjriano Aprilindo T.",
  email: "fajri@example.com",
  nomor_induk_mahasiswa: "F1G121005",
  jurusan: "Ilmu Komputer",
  sesi_tes: "Pagi",
  tanggal_tes: 21,
  nilai_listening: 25,
  nilai_structure: 30,
  nilai_reading: 28,
  tanggal_terbit: 22,
  address_admin: owner.address,
};

await contract.storedRecord(toeflHash, record);
```

- Ambil record dengan `getRecord`:

```js
const stored = await contract.getRecord(toeflHash);
console.log(stored.nama_lengkap, stored.email, stored.nilai_reading);
```

## Deploy (modul Ignition)

Repositori ini menyertakan modul Ignition di `ignition/modules/ToeflRecord.ts`. Untuk deploy ke chain lokal jalankan:

```shell
npx hardhat ignition deploy ignition/modules/ToeflRecord.ts
```

Untuk deploy ke testnet (mis. Sepolia) atur `SEPOLIA_PRIVATE_KEY` sebagai environment variable atau melalui `hardhat-keystore`, lalu jalankan:

```shell
npx hardhat ignition deploy --network sepolia ignition/modules/ToeflRecord.ts
```

## Catatan

- Kontrak mencegah duplikasi record untuk `toefl_hash` yang sama dan akan revert dengan pesan `Record already exists` jika Anda mencoba menyimpan duplikat.
- Meminta `toefl_hash` yang tidak ada akan revert dengan pesan `Record not found`.

---
