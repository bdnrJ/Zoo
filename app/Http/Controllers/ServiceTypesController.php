<?php

namespace App\Http\Controllers;

use App\Models\service_types;
use App\Models\ServiceType;
use Illuminate\Http\Request;

class ServiceTypesController extends Controller
{
    public function index()
    {
        $serviceTypes = ServiceType::all();
        return response()->json($serviceTypes);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'type' => 'required|string',
            'price_per_customer' => 'required|numeric',
            'is_active' => 'required|boolean',
        ]);

        $serviceType = ServiceType::create($request->all());
        return response()->json($serviceType, 201);
    }

    public function show(ServiceType $serviceType)
    {
        return response()->json($serviceType);
    }

    public function update(Request $request, ServiceType $serviceType)
    {
        $this->validate($request, [
            'name' => 'sometimes|required|string',
            'type' => 'sometimes|required|string',
            'price_per_customer' => 'sometimes|required|numeric',
            'is_active' => 'sometimes|required|boolean',
        ]);

        $serviceType->update($request->all());
        return response()->json($serviceType);
    }

    public function destroy(ServiceType $serviceType)
    {
        $serviceType->delete();
        return response()->json(['message' => 'Service type deleted successfully'], 204);
    }
}
