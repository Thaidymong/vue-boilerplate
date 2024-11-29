<template>
  <div class="h-screen">
    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនបុគ្គលិក
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-9 text-center">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនអ្នកប្រើប្រាស់
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-9 text-center">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនភ្នាក់ងារ
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនរោងម៉ាស៊ីន
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">ចំនួនសាខា</p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនអតិថិជន
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-md shadow-md px-2">
            <div class="grid grid-rows-3 grid-flow-col gap-4 h-24">
              <div class="col-span-2 h-10 pt-2 text-center">
                <p class="text-sm siemreap-regular text-[#6d6c6c]">
                  ចំនួនស្នើរសុំ
                </p>
              </div>
              <div class="row-span-1 col-span-2 h-10">
                <p class="col-start-2 text-xl text-center text-[#00992B]">11</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full bg-white shadow-lg rounded-lg px-5 mt-5">
          <p
            class="px-1 py-4 text-lg font-semibold underline text-[#00992B] moul-regular"
          >
            ស្នើរថ្មីដែលបានស្នើក្នុងថ្ងៃនេះ
          </p>
          <table
            class="w-full shadow-md border-collapse text-sm text-left text-gray-700"
            style="border-radius: 10px; overflow: hidden"
          >
            <thead class="text-xs bg-gray-100">
              <tr class="text-[13px]">
                <th
                  class="px-4 border py-2 text-[12px] whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  ល.រ
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  ឈ្មោះរោងម៉ាស៊ីន
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  សាខា
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  បរិមាណអង្ករ
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  តម្លៃ
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  ស្ថានភាព
                </th>
                <th
                  class="px-4 border py-2 whitespace-nowrap overflow-hidden text-ellipsis siemreap-regular"
                >
                  កាលបរិច្ឆេទ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="siemreap-regular bg-white border hover:bg-[#00992B] hover:text-white"
              >
                <td
                  class="w-[30px] px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd<span class="px-2 text-red-600">បេ</span>
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd <span class="px-2 text-red-600">kg</span>
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  dd
                </td>
                <td
                  class="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  adn
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
