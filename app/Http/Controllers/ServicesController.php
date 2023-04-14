<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index()
    {
        $services = Service::with('serviceType')->get();

        return response()->json([
            'services' => $services,
        ]);
    }
}
