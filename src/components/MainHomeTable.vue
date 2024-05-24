<template>
<div class="py-8 w-4/5 mx-auto">
  <div class="shadow overflow-hidden rounded-lg border-b border-violet-200">
    <table class="min-w-full bg-white">
      <thead class="bg-violet-800 text-white rounded-t-lg">
        <tr>
          <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm rounded-tl-lg">Task Frequency</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">24 May</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">25 May</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">26 May</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">27 May</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">28 May</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm rounded-tr-lg">29 May</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
        <tr>
          <td class="w-1/3 text-left py-3 px-4">Daily</td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
        </tr>
        <tr class="bg-violet-100">
          <td class="w-1/3 text-left py-3 px-4">Weekly</td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
        </tr>
        <tr>
          <td class="w-1/3 text-left py-3 px-4">Monthly</td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
        </tr>
        <tr class="bg-violet-100">
          <td class="w-1/3 text-left py-3 px-4">Yearly</td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
          <td class="text-left py-3 px-4"><span class="text-red-500">✘</span></td>
          <td class="text-left py-3 px-4"><span class="text-green-500">✔</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>
<script>
export default {
  name: 'MainHomeTable'
}
</script>