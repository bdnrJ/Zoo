<?php

namespace App\Http\Controllers;

use App\Models\service_types;
use App\Models\ServiceType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
            'description' => 'required|string',
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

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:45',
            'description' => 'required|max:500',
            'price_per_customer' => 'required|numeric',
            'is_active' => 'required|boolean',
            'confirmPassword' => 'required',
        ]);

        $serviceType = ServiceType::find($id);
        if(!$serviceType) {
            return response()->json(['message' => 'Service type not found'], 404);
        }

        $user = auth()->user();
        if (!Hash::check($request->confirmPassword, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 403);
        }

        $serviceType->update($request->except('confirmPassword'));

        return response()->json($serviceType, 200);
    }

    public function destroy(ServiceType $serviceType)
    {
        $serviceType->delete();
        return response()->json(['message' => 'Service type deleted successfully'], 204);
    }
}
