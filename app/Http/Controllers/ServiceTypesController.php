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
    ]);

    $serviceTypeData = $request->all();
    $serviceTypeData['is_active'] = false; // set to always false
    $serviceType = ServiceType::create($serviceTypeData);

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
            'confirm_password' => 'required',
        ]);

        $serviceType = ServiceType::find($id);
        if(!$serviceType) {
            return response()->json(['message' => 'Service type not found'], 404);
        }

        $user = auth()->user();
        if (!Hash::check($request->confirm_password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 403);
        }

        $serviceType->update($request->except('confirm_password'));

        return response()->json($serviceType, 200);
    }

    public function destroy(ServiceType $serviceType)
    {
        $serviceType->delete();
        return response()->json(['message' => 'Service type deleted successfully'], 204);
    }
}
